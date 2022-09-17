using Proyecto_final.Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Proyecto_final.Server.Services
{
    public interface ITransactionService
    {
        Task<IEnumerable<Transaction>> GetTransactions(int UserId);
        Task<IEnumerable<Transaction>> GetTransactionByType(int type, int UserId);
        Task<int> AddTransaction(Transaction transaction);
        Task BulkAddTransaction(List<Transaction> transactions);
        Task<int> UpdateTransaction(Transaction transaction);
        Task<int> DeleteTransaction(int id);
    }
}
