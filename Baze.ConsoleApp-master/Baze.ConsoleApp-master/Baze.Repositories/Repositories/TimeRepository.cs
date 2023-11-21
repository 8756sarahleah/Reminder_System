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
    public class TimeRepository : IDataRepository<Time>
    {
        private readonly IContext _context;
        public TimeRepository(IContext context)
        {
            _context = context;
        }

        public async Task<Time> AddAsync(Time entity)
        {
            EntityEntry<Time> newOne = _context.Hours.Add(entity);

            await _context.SaveChangesAsync();
            return newOne.Entity;
        }

        public async Task DeleteAsync(int id)
        {

            _context.Hours.Remove(_context.Hours.FirstOrDefault(c => c.Id == id));
            await _context.SaveChangesAsync();
        }

        //public Task<List<Time>> GetAllAsync()
        //{
        //    throw new NotImplementedException();
        //}

        public async Task<List<Time>> GetAllAsync()
        {
            return await _context.Hours.ToListAsync();
        }

        public async Task<Time> GetByIdAsync(int id)
        {
            return await _context.Hours.FindAsync(id);
        }
        public async Task<List<Time>> GetByMedicineUsageIdAsync(int medicineUsageId)
        {
            return await _context.Hours.Where(h=>h.MedicineUsageId==medicineUsageId).ToListAsync();
        }
        public async Task<Time> UpdateAsync(int id, Time entity)
        {
            var q = await GetByIdAsync(id);
            q.Hour = entity.Hour;
            q.MedicineUsageId = entity.MedicineUsageId;
            var newEntity = _context.Hours.Update(q);
            await _context.SaveChangesAsync();
            return newEntity.Entity;
        }
    }
}
