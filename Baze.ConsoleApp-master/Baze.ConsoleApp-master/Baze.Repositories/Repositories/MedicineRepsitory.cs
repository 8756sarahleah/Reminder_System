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
    public class MedicineRepository : IDataRepository<Medicine>
    {
        private readonly IContext _context;
        public MedicineRepository(IContext context)
        {
            _context = context;
        }

        public async Task<Medicine> AddAsync(Medicine entity)
        {
            EntityEntry<Medicine> newOne = _context.Medicines.Add(entity);

            await _context.SaveChangesAsync();
            return newOne.Entity;
        }

        public async Task DeleteAsync(int id)
        {

            _context.Medicines.Remove(_context.Medicines.FirstOrDefault(m => m.Id == id));
            await _context.SaveChangesAsync();
        }

        public async Task<List<Medicine>> GetAllAsync()
        {
            return await _context.Medicines.ToListAsync();
        }

        public async Task<Medicine> GetByIdAsync(int id)
        {
            return await _context.Medicines.FindAsync(id);
        }

        public async Task<Medicine> UpdateAsync(int id,Medicine entity)
        {
            var q = await GetByIdAsync(id);
            q.Name = entity.Name;
            var newEntity = _context.Medicines.Update(q);
            await _context.SaveChangesAsync();
            return newEntity.Entity;
        }
    }
}
