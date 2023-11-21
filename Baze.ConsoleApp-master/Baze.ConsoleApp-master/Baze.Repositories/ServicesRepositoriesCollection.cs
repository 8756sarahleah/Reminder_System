using Baze.Repositories.Entities;
using Baze.Repositories.Interfaces;
using Baze.Repositories.Repositories;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Baze.Repositories
{
    public static class ServicesRepositoriesCollection
    {
        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            services.AddScoped<IDataRepository<Client>, ClientRepository>();
            services.AddScoped<IDataRepository<Medicine>, MedicineRepository>();
            services.AddScoped<IDataRepository<MedicineUsage>, MedicineUsageRepository>();
            services.AddScoped<IDataRepository<Time>, TimeRepository>();
            return services;

        }
        public static string ToStringProperties<T>(this T obj)
        {
            string str = "";//קבלת רשימת המאפיינים של העצם
            foreach (var item in obj.GetType().GetProperties())
            {
                str += item.Name;
                if (item.PropertyType.IsArray)
                {//התיחסות  למקרה של  אוספים
                    var q = item.GetValue(obj);

                    string s = String.Join(',', q as string[]);
                    str += "\n" + s;
                }
                else
                    //שרשור על ידי קבלת הערך מהמאפין
                    str += item.Name + ":" + item?.GetValue(obj) + ",";
            }
            return str.Remove(str.Length - 1);
        }
    }
}