using Microsoft.EntityFrameworkCore;
using Proyecto_final.Server.Data;
using Proyecto_final.Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Proyecto_final.Server.Services
{
    public class UserService : IUserService
    {
        private readonly TransactionDbContext dbContext;

        public UserService(TransactionDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<IEnumerable<User>> GetAll()
        {
            return await this.dbContext.Users.AsNoTracking().ToListAsync();
        }

        public async Task<User> GetUserById(int id)
        {
            return await this.dbContext.Users.AsNoTracking().Where(t => t.Id == id).FirstOrDefaultAsync();
        }

        public async Task<int> AddUser(User user)
        {
            await this.dbContext.Users.AddAsync(user);
            return await this.dbContext.SaveChangesAsync();
        }

        public async Task<int> UpdateUser(User user)
        {
            this.dbContext.Attach(user).State = EntityState.Modified;
            return await this.dbContext.SaveChangesAsync();
        }

        public async Task<int> DeleteUser(int id)
        {
            var transaction = await this.dbContext.Users.AsNoTracking().FirstOrDefaultAsync(t => t.Id == id);
            this.dbContext.Attach(transaction).State = EntityState.Deleted;
            return await this.dbContext.SaveChangesAsync();
        }

        public async Task<bool> ExistEmail(string email)
        {
            return await this.dbContext.Users.AnyAsync(User => User.Email == email);
        }
    }
}
