using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Proyecto_final.Server.ApiResponse;
using Proyecto_final.Server.Attributes;
using Proyecto_final.Server.Dtos;
using Proyecto_final.Server.Services;
using Proyecto_final.Server.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Proyecto_final.Server.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    [ApiKey]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService authService;
        private readonly IConfiguration configuration;

        public AuthController(IAuthService authService, IConfiguration configuration)
        {
            this.authService = authService;
            this.configuration = configuration;
        }


        [HttpPost]
        public async Task<ActionResult<ApiResponse<UserResponse>>> Login([FromBody] LoginDto login)
        {
            var response = new ApiResponse<UserResponse>();
            try
            {
                var user = await this.authService
                    .Login(login.Email, login.Password.ToEncryptedPassword());
                if (user is null)
                {
                    response.Succeeded = false;
                    response.Message = "Usuario o Contraseña incorrecta";
                    return NotFound(response);
                }
                var userResponse = new UserResponse(user)
                {
                    Token = GenerateJWT.Generate(user, this.configuration)
                };
                response.Data = userResponse;
            }
            catch (System.Exception)
            {
                response.Message = "Ocurio un error al obtener autenticar el usuario";
                response.Succeeded = false;
                return BadRequest(response);
            }
            return Ok(response);
        }

    }
}
