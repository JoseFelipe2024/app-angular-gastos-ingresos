using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Proyecto_final.Server.ApiResponse;
using Proyecto_final.Server.Attributes;
using Proyecto_final.Server.Models;
using Proyecto_final.Server.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Proyecto_final.Server.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    [Authorize]
    [ApiKey]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService transaction;

        public TransactionController(ITransactionService transaction)
        {
            this.transaction = transaction;
        }


        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<Transaction>>>> Get(int UserId)
        {
            var response = new ApiResponse<IEnumerable<Transaction>>();
            try
            {
                response.Data = await this.transaction.GetTransactionsByUserId(UserId);

            }
            catch (Exception ex)
            {
                response.Message = "Ocurrió un error al obtener los datos";
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpGet("Type")]
        public async Task<ActionResult<ApiResponse<IEnumerable<Transaction>>>> GetByType(int type, int UserId)
        {
            var response = new ApiResponse<IEnumerable<Transaction>>();
            try
            {
                response.Data = await this.transaction.GetTransactionByType(type, UserId);
            }
            catch (Exception ex)
            {
                response.Message = "Ocurrió un error al obtener los datos";
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse<int>>> Post([FromBody] Transaction transaction)
        {
            var response = new ApiResponse<int>();
            try
            {
                response.Data = await this.transaction.AddTransaction(transaction);
            }
            catch (Exception ex)
            {
                response.Message = "Ocurrió un error al insertar el nuevo registro";
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpPost("bulkLoad")]
        public async Task<ActionResult<ApiResponse<int>>> PostBuldLoad([FromBody] List<Transaction> transaction)
        {
            var response = new ApiResponse<int>();
            try
            {
                await this.transaction.BulkAddTransaction(transaction);
            }
            catch (Exception ex)
            {
                response.Message = "Ocurrió un error al insertar el nuevo registro";
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpPut]
        public async Task<ActionResult<ApiResponse<int>>> Update([FromBody] Transaction transaction)
        {
            var response = new ApiResponse<int>();
            try
            {
                response.Data = await this.transaction.UpdateTransaction(transaction);
            }
            catch (Exception ex)
            {
                response.Message = "Ocurrió un error al actualizar el registro";
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpDelete]
        public async Task<ActionResult<ApiResponse<int>>> Delete(int id)
        {
            var response = new ApiResponse<int>();
            try
            {
                response.Data = await this.transaction.DeleteTransaction(id);
            }
            catch (Exception ex)
            {
                response.Message = "Ocurrió un error al eliminar el registro";
                return BadRequest(response);
            }

            return Ok(response);
        }


    }
}
