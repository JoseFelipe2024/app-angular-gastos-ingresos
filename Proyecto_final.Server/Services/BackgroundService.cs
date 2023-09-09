using Microsoft.Extensions.Hosting;
using System.Threading.Tasks;
using System.Threading;
using System;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Proyecto_final.Server.ConfigurationModels;
using System.Linq;
using Proyecto_final.Server.Dtos;
using System.IO;
using System.Text;
using System.Xml.Linq;
using System.Net.Mail;

namespace Proyecto_final.Server.Services
{
    public abstract class BackgroundService : IHostedService, IDisposable
    {
        private Task _executingTask;
        private readonly CancellationTokenSource _stoppingCts = new CancellationTokenSource();

        protected abstract Task ExecuteAsync(CancellationToken stoppingToken);

        public virtual Task StartAsync(CancellationToken cancellationToken)
        {
            // Store the task we're executing
            _executingTask = ExecuteAsync(_stoppingCts.Token);

            // If the task is completed then return it, this will bubble cancellation and failure to the caller
            if (_executingTask.IsCompleted)
            {
                return _executingTask;
            }

            // Otherwise it's running
            return Task.CompletedTask;
        }

        public virtual async Task StopAsync(CancellationToken cancellationToken)
        {
            // Stop called without start
            if (_executingTask == null)
            {
                return;
            }
            try
            {
                // Signal cancellation to the executing method
                _stoppingCts.Cancel();
            }
            finally
            {
                // Wait until the task completes or the stop token triggers
                await Task.WhenAny(_executingTask, Task.Delay(Timeout.Infinite, cancellationToken));
            }
        }

        public virtual void Dispose()
        {
            _stoppingCts.Cancel();
        }
    }

    public class WorkerBackup : BackgroundService
    {
        private readonly ILogger<WorkerBackup> _logger;
        private readonly IServiceScopeFactory _serviceScopeFactory;

        public WorkerBackup(ILogger<WorkerBackup> logger, IServiceScopeFactory serviceScopeFactory)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _serviceScopeFactory = serviceScopeFactory ?? throw new ArgumentNullException(nameof(serviceScopeFactory));
        }
        protected override async Task ExecuteAsync(CancellationToken cancellationToken)
        {
            var now = DateTime.Now;
            var hours = 23 - now.Hour;
            var minutes = 59 - now.Minute;
            var seconds = 59 - now.Second;
            var secondsTillMidnight = hours * 3600 + minutes * 60 + seconds;

            await Task.Delay(TimeSpan.FromSeconds(secondsTillMidnight), cancellationToken);

            while (!cancellationToken.IsCancellationRequested)
            {
                await this.SendEmail(cancellationToken);
                await Task.Delay(TimeSpan.FromHours(24), cancellationToken);
            }
        }

        private async Task SendEmail(CancellationToken cancellationToken)
        {
            try
            {
                using var scope = _serviceScopeFactory.CreateScope();

                var _transactionService = this.GetITransactionService(scope);
                var transactions = await _transactionService.GetTransactions();
                var transactionGroupedByUser = transactions.GroupBy(t => t.User.Email)
                .Select(g => new TransactionGrouped
                {
                    User = g.Key,
                    Transactions = g.ToList()
                })
                .ToList();

                var _emailServices = this.GetIMailService(scope);

                StringBuilder sb = new StringBuilder();
                foreach (var item in transactionGroupedByUser)
                {
                    item.Transactions.ForEach(t =>
                    {
                        sb.AppendLine(string.Format("{0}|{1}|{2}|{3}|{4}|{5}", item.User, t.Amount, t.Description, t.Type, t.CreateDate, t.UpdateDate));
                    });

                    var mailRequest = new MailRequest()
                    {
                        ToEmail = item.User,
                        Subject = "Copia de Seguridad: " + DateTime.Now,
                        Body = "Copia de Seguridad de las transacciones realizadas en la aplicacion de gastos e ingresos",
                        Attachment = new MailRequestFile()
                        {
                            FileName = $"Backup-{DateTime.Now}.txt",
                            File = Encoding.UTF8.GetBytes(sb.ToString()),
                            ContentType = "text/plain"
                        }
                    };
                    sb.Remove(0, sb.Length - 1);
                    await _emailServices.SendEmailAsync(mailRequest);
                }

            }
            catch (Exception ex)
            {
                await this.StopAsync(cancellationToken);
            }
        }

        private ITransactionService GetITransactionService(IServiceScope scope)
        {
            return scope.ServiceProvider.GetRequiredService<ITransactionService>();
        }

        private IMailService GetIMailService(IServiceScope scope)
        {
            return scope.ServiceProvider.GetRequiredService<IMailService>();
        }

    }

}
