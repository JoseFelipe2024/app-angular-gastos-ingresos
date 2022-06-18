using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Proyecto_final.Server.ApiResponse;
using Proyecto_final.Server.Models;
using Proyecto_final.Server.Services;
using System;
using Proyecto_final.Server.Tools;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Proyecto_final.Server.Dtos;

namespace Proyecto_final.Server.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService userService;
        private readonly IMapper mapper;

        public UsersController(IUserService userService, IMapper mapper)
        {
            this.userService = userService;
            this.mapper = mapper;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<ApiResponse<IEnumerable<GetUserDto>>>> Get()
        {
            var response = new ApiResponse<IEnumerable<GetUserDto>>();
            try
            {
                var users = await this.userService.GetAll();
                response.Data = mapper.Map<IEnumerable<GetUserDto>>(users);
            }
            catch (Exception ex)
            {
                response.Message = "Ocurrió un error al obtener los datos";
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpGet("ExistEmail")]
        public async Task<ActionResult<ApiResponse<bool>>> ExistEmail(string email)
        {
            var response = new ApiResponse<bool>();
            try
            {
                response.Data = await this.userService.ExistEmail(email);
            }
            catch (Exception ex)
            {
                response.Message = "Ocurrió un error al obtener los datos";
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpGet("id")]
        [Authorize]
        public async Task<ActionResult<ApiResponse<GetUserDto>>> GetById(int id)
        {
            var response = new ApiResponse<GetUserDto>();
            try
            {
                var user = await this.userService.GetUserById(id);
                if(user == null)
                {
                    response.Message = $"El usuario con el identificador {id} no existe";
                    response.Succeeded = false;
                    return NotFound(response);
                }
                response.Data = mapper.Map<GetUserDto>(user);
            }
            catch (Exception ex)
            {
                response.Message = "Ocurrió un error al obtener los datos";
                response.Succeeded = false;
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse<int>>> Post([FromBody] AddUserDto userDto)
        {
            var response = new ApiResponse<int>();
            try
            {
                var user = mapper.Map<User>(userDto);
                user.CreateDate = new DateTimeOffset();
                user.UpdateDate = new DateTimeOffset();
                user.Password = user.Password.ToEncryptedPassword();
                response.Data = await this.userService.AddUser(user);
            }
            catch (Exception ex)
            {
                response.Message = "Ocurrió un error al insertar el nuevo registro";
                response.Succeeded = false;
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpPut]
        [Authorize]
        public async Task<ActionResult<ApiResponse<int>>> Update([FromBody] UpdateUserDto userDto)
        {
            var response = new ApiResponse<int>();
            try
            {
                var user = await this.userService.GetUserById(userDto.Id);
                if (user == null)
                {
                    response.Message = $"El usuario con el identificador {userDto.Id} no existe";
                    response.Succeeded = false;
                    return NotFound(response);
                }
                user.FirstName = userDto.FirstName;
                user.LastName = userDto.LastName;
                user.Email = userDto.Email;
                user.Photo = userDto.Photo;
                user.UpdateDate = new DateTimeOffset();
                response.Data = await this.userService.UpdateUser(user);
            }
            catch (Exception ex)
            {
                response.Message = "Ocurrió un error al actualizar el registro";
                response.Succeeded = false;
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpDelete]
        [Authorize]
        public async Task<ActionResult<ApiResponse<int>>> Delete(int id)
        {
            var response = new ApiResponse<int>();
            try
            {
                var user = await this.userService.GetUserById(id);
                if (user == null)
                {
                    response.Message = $"El usuario con el identificador {id} no existe";
                    response.Succeeded = false;
                    return NotFound(response);
                }
                response.Data = await this.userService.DeleteUser(id);
            }
            catch (Exception ex)
            {
                response.Message = "Ocurrió un error al eliminar el registro";
                response.Succeeded = false;
                return BadRequest(response);
            }

            return Ok(response);
        }

    }
}
