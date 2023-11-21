using AutoMapper;
using Baze.Common.DTO_s;
using Baze.Repositories.Entities;
using Baze.Repositories.Interfaces;
using Baze.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Baze.Services.Services
{
    public class ClientService: IDataService<ClientDto>
    {
        private readonly IDataRepository<Client> dataRepository;
        private readonly IMapper mapper;
        public ClientService(IDataRepository<Client> dataRepository, IMapper mapper)
        {
            this.dataRepository = dataRepository;
            this.mapper = mapper;
        }

        public async Task<ClientDto> AddAsync(ClientDto entity)
        {
            Client newClient = mapper.Map<Client>(entity);
            var c = await dataRepository.AddAsync(newClient);
            var newOne = mapper.Map<ClientDto>(c);
            return newOne;
        }

        public async Task DeleteAsync(int id)
        {
            await dataRepository.DeleteAsync(id);
        }

        public async Task<List<ClientDto>> GetAllAsync()
        {
            return mapper.Map<List<ClientDto>>(await dataRepository.GetAllAsync());
        }

        public async Task<ClientDto> GetByIdAsync(int id)
        {
            return mapper.Map<ClientDto>(await dataRepository.GetByIdAsync(id));
        }

        public async Task<ClientDto> UpdateAsync(int id,ClientDto entity)
        {
            var q = await dataRepository.UpdateAsync(id,mapper.Map<Client>(entity));
            return mapper.Map<ClientDto>(q);
        }
    }
}

