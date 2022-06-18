using Microsoft.EntityFrameworkCore;
using Proyecto_final.Server.Data;
using Proyecto_final.Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Proyecto_final.Server.Services
{
    public class AuthService : IAuthService
    {
        private readonly TransactionDbContext dbContext;

        public AuthService(TransactionDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<User> Login(string email, string password)
        {
            return await this.dbContext.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Email == email && u.Password == password);
        }
    }
}
