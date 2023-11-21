using Baze.Common;
using Baze.Common.DTO_s;
using Baze.DBContext;
using Baze.Repositories;
using Baze.Repositories.Entities;
using Baze.Repositories.Interfaces;
using Baze.Services.Interfaces;
using Baze.Services.Services;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Baze.Services
{
    public static class ServiceCollectionExtentions
    {
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddRepositories();
            services.AddScoped<IDataService<ClientDto>, ClientService>();
            services.AddScoped<IDataService<TimeDto>, TimeService>();
            services.AddScoped<IDataService<MedicineDto>, MedicineService>();
            services.AddScoped<IDataService<MedicineUsageDto>, MedicineUsageService>();
            services.AddDbContext<IContext, Reminder>();
            services.AddAutoMapper(typeof(MappingProfile));
            return services;
        }
    }
}
