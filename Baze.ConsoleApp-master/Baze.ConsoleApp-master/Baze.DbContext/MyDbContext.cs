using Baze.Repositories.Entities;
using Baze.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Baze.DBContext
{
    // שם מסד הנתונים - מתזכר
    public class Reminder : DbContext,IContext
    {
        public DbSet<Client> Clients { get; set; }

        //medicine usage
        public DbSet<Time> Hours { get; set; }
        public DbSet<Medicine> Medicines { get; set; }
        public DbSet<MedicineUsage> MedicineUsages { get; set; }

        //on configuring
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=ReminderDb;Trusted_Connection=True");   
        }
        //public Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        //{
        //    throw new NotImplementedException();
        //}
    }
}