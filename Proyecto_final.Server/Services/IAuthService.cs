using Proyecto_final.Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Proyecto_final.Server.Services
{
    public interface IAuthService
    {
        Task<User> Login(string email, string password);
    }
}
