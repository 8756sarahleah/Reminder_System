using AutoMapper;
using Baze.Common.DTO_s;
using Baze.Repositories.Entities;
using Baze.Repositories.Interfaces;
using Baze.Repositories.Repositories;
using Baze.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Baze.Services.Services
{
    public class TimeService:IDataService<TimeDto>
    {
        private readonly IDataRepository<Time> dataRepository;
        private readonly IMapper mapper;
        public TimeService(IDataRepository<Time> dataRepository, IMapper mapper)
        {
            this.dataRepository = dataRepository;
            this.mapper = mapper;
        }

        public async Task<TimeDto> AddAsync(TimeDto entity)
        {
            Time newTime = mapper.Map<Time>(entity);
            var c = await dataRepository.AddAsync(newTime);
            var newOne = mapper.Map<TimeDto>(c);
            return newOne;
        }

        public async Task DeleteAsync(int id)
        {
            await dataRepository.DeleteAsync(id);
        }

        public async Task<List<TimeDto>> GetAllAsync()
        {
            return mapper.Map<List<TimeDto>>(await dataRepository.GetAllAsync());
        }

        public async Task<TimeDto> GetByIdAsync(int id)
        {
            return mapper.Map<TimeDto>(await dataRepository.GetByIdAsync(id));
        }
        public async Task<List<TimeDto>> GetByMedicineUsageIdAsync(int medicineUsageId)
        {
            return mapper.Map<List<TimeDto>>(await( dataRepository as TimeRepository).GetByMedicineUsageIdAsync(medicineUsageId));
        }

        public async Task<TimeDto> UpdateAsync(int id, TimeDto entity)
        {
            var q = await dataRepository.UpdateAsync(id, mapper.Map<Time>(entity));
            return mapper.Map<TimeDto>(q);
        }

     
    }
}
