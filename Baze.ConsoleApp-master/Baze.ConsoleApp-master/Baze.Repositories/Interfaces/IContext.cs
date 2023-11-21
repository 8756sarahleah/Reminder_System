using Baze.Repositories.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Baze.Repositories.Interfaces
{
    public interface IContext
    {
        DbSet<Client> Clients { get; set; }
        DbSet<Time> Hours { get; set; }
        DbSet<Medicine> Medicines { get; set; }
        DbSet<MedicineUsage> MedicineUsages { get; set; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);


    }
}
