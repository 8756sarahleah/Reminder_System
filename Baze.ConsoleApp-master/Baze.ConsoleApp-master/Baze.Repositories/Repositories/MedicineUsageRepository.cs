using Baze.Repositories.Entities;
using Baze.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Baze.Repositories.Repositories
{
    public class MedicineUsageRepository : IDataRepository<MedicineUsage>
    {
        private readonly IContext _context;
        public MedicineUsageRepository(IContext context)
        {
            _context = context;
        }

        public async Task<MedicineUsage> AddAsync(MedicineUsage entity)
        {
            EntityEntry<MedicineUsage> newOne = _context.MedicineUsages.Add(entity);
            await _context.SaveChangesAsync();
            return newOne.Entity;
        }

        public async Task DeleteAsync(int id)
        {

            _context.MedicineUsages.Remove(_context.MedicineUsages.FirstOrDefault(m => m.Id == id));
            await _context.SaveChangesAsync();
        }

        public async Task<List<MedicineUsage>> GetAllAsync()
        {
            return await _context.MedicineUsages.ToListAsync();
        }

        public async Task<MedicineUsage> GetByIdAsync(int id)
        {
            return await _context.MedicineUsages.FindAsync(id);
        }

        public async Task<MedicineUsage> UpdateAsync(int id, MedicineUsage entity)
        {
            var q = await GetByIdAsync(id);
            q.Amount = entity.Amount;
            q.Hours = entity.Hours;
            q.FromDate = entity.FromDate;
            q.ToDate = entity.ToDate;
            q.MedicineId = entity.MedicineId;
            var newEntity = _context.MedicineUsages.Update(q);
            await _context.SaveChangesAsync();
            return newEntity.Entity;
        }
        public async Task<List<MedicineUsage>> GetAllMedicineusagesByIdAsync(int id)
        {
            var q = await GetAllAsync();
            return q.FindAll(c => c.ClientId == id);
        }
    }
}
