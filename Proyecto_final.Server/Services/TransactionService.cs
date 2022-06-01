using Microsoft.EntityFrameworkCore;
using Proyecto_final.Server.Data;
using Proyecto_final.Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Proyecto_final.Server.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly TransactionDbContext transactionDbContext;

        public TransactionService(TransactionDbContext transactionDbContext)
        {
            this.transactionDbContext = transactionDbContext;
        }

        public async Task<IEnumerable<Transaction>> GetTransactions()
        {
            return await this.transactionDbContext.Transaction.AsNoTracking().ToListAsync();
        }

        public async Task<IEnumerable<Transaction>> GetTransactionByType(int type)
        {
            return await this.transactionDbContext.Transaction.AsNoTracking().Where(t => t.Type == type).ToListAsync();
        }

        public async Task<int> AddTransaction(Transaction transaction)
        {
            await this.transactionDbContext.Transaction.AddAsync(transaction);
            return await this.transactionDbContext.SaveChangesAsync();
        }

        public async Task<int> DeleteTransaction(int id)
        {
            var transaction = await this.transactionDbContext.Transaction.AsNoTracking().FirstOrDefaultAsync(t => t.Id == id);
            this.transactionDbContext.Attach(transaction).State = EntityState.Deleted;
            return await this.transactionDbContext.SaveChangesAsync();
        }

       
        public async Task<int> UpdateTransaction(Transaction transaction)
        {
            this.transactionDbContext.Attach(transaction).State = EntityState.Modified;
            return await this.transactionDbContext.SaveChangesAsync();
        }
    }
}
