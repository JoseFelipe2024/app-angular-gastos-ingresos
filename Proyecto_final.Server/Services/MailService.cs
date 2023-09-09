using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using Proyecto_final.Server.ConfigurationModels;
using Proyecto_final.Server.Dtos;
using System.IO;
using System.Threading.Tasks;

using MailKit.Net.Smtp;
using MimeKit;

namespace Proyecto_final.Server.Services
{
    public interface IMailService
    {
        Task SendEmailAsync(MailRequest mailRequest);
    }

    public class MailService : IMailService
    {
        private readonly EmailConfiguration _emailConfiguration;
        public MailService(EmailConfiguration emailConfiguration)
        {
            _emailConfiguration = emailConfiguration;
        }

        public async Task SendEmailAsync(MailRequest mailRequest)
        {
            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(_emailConfiguration.Mail);
            email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));
            email.Subject = mailRequest.Subject;
            var builder = new BodyBuilder();

            if (mailRequest.Attachment != null)
            {
                builder.Attachments.Add(mailRequest.Attachment.FileName, mailRequest.Attachment.File, ContentType.Parse(mailRequest.Attachment.ContentType));
            }
            builder.HtmlBody = mailRequest.Body;
            email.Body = builder.ToMessageBody();
            using var smtp = new SmtpClient();
            smtp.Connect(_emailConfiguration.Host, _emailConfiguration.Port, SecureSocketOptions.StartTls);
            smtp.Authenticate(_emailConfiguration.Mail, _emailConfiguration.Password);
            await smtp.SendAsync(email);
            smtp.Disconnect(true);
        }
    }
}
