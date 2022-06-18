using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Proyecto_final.Server.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public double Amount { get; set; }
        public DateTimeOffset Date { get; set; }
        public string Description { get; set; }
        public int Type { get; set; } 
        public string Evidence { get; set; }
        public string TypeFile { get; set; }
        public DateTimeOffset CreateDate { get; set; }
        public DateTimeOffset UpdateDate { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }

}
