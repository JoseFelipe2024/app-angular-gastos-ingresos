using AutoMapper;
using Proyecto_final.Server.Dtos;
using Proyecto_final.Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Proyecto_final.Server.AutoMapperConfig
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, GetUserDto>();
            CreateMap<UpdateUserDto, User>();
            CreateMap<AddUserDto, User>();
        }
    }
}
