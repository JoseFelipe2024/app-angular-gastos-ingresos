using Proyecto_final.Server.Models;
using System.Collections.Generic;

namespace Proyecto_final.Server.Dtos
{
    public class TransactionGrouped
    {
        public string User { get; set; }
        public List<Transaction> Transactions { get; set; }
    }
}
