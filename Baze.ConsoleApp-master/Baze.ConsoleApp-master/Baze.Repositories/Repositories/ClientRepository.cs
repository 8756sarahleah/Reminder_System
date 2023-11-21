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
    public class ClientRepository : IDataRepository<Client>
    {
        private readonly IContext _context;
        public ClientRepository(IContext context)
        {
            _context = context;
        }

        public async Task<Client> AddAsync(Client entity)
        {
            EntityEntry<Client> newOne = _context.Clients.Add(entity);

            await _context.SaveChangesAsync();
            return newOne.Entity;
        }

        public async Task DeleteAsync(int id)
        {

            _context.Clients.Remove(_context.Clients.FirstOrDefault(c => c.Id == id));
            await _context.SaveChangesAsync();
        }

        public async Task<List<Client>> GetAllAsync()
        {
            return await _context.Clients.ToListAsync();
        }

        public async Task<Client> GetByIdAsync(int id)
        {
            return await _context.Clients.FindAsync(id);
        }

        public async Task<Client> UpdateAsync(int id, Client entity)
        {
            var q = await GetByIdAsync(id);
            q.FirstName = entity.FirstName;
            q.LastName = entity.LastName;
            q.Password= entity.Password;
            q.Phone1 = entity.Phone1;
            q.Phone2 = entity.Phone2;
            q.Phone3 = entity.Phone3;
            //q.Medicines = entity.Medicines;
            var newEntity = _context.Clients.Update(q);
            await _context.SaveChangesAsync();
            return newEntity.Entity;
        }
    }
}
