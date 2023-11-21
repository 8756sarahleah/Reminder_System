using AutoMapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Claims;
using System.Security;
using System.Text;
using System.Threading.Tasks;
using System.Drawing;
using Baze.Common.DTO_s;
using Baze.Repositories.Entities;
using Baze.Common;


namespace Baze.Services
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            CreateMap<Client, ClientDto>().ReverseMap();
            CreateMap<Time, TimeDto>().ReverseMap();
            CreateMap<Medicine, MedicineDto>().ReverseMap();
            CreateMap<MedicineUsage, MedicineUsageDto>().ReverseMap();
        }
    }
}
