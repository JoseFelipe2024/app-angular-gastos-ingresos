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

        public async Task<IEnumerable<Transaction>> GetTransactionsByUserId(int UserId)
        {
            return await this.transactionDbContext.Transaction.AsNoTracking().Where(t => t.UserId == UserId).ToListAsync();
        }


        public async Task<IEnumerable<Transaction>> GetTransactions()
        {
            return await this.transactionDbContext.Transaction.AsNoTracking().Include(transaction => transaction.User).ToListAsync();
        }

        public async Task<IEnumerable<Transaction>> GetTransactionByType(int type, int UserId)
        {
            return await this.transactionDbContext.Transaction.AsNoTracking().Where(t => t.Type == type && t.UserId == UserId).ToListAsync();
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

        public async Task BulkAddTransaction(List<Transaction> transactions)
        {
            await  this.transactionDbContext.AddRangeAsync(transactions);
            await this.transactionDbContext.SaveChangesAsync();
        }
    }
}
