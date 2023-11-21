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
    public class MedicineUsageService : IDataService<MedicineUsageDto>
    {
        private readonly IDataRepository<MedicineUsage> dataRepository;
        private readonly IMapper mapper;
        public MedicineUsageService(IDataRepository<MedicineUsage> dataRepository, IMapper mapper)
        {
            this.dataRepository = dataRepository;
            this.mapper = mapper;
        }

        public async Task<MedicineUsageDto> AddAsync(MedicineUsageDto entity)
        {
            MedicineUsage newMedcineUsage = mapper.Map<MedicineUsage>(entity);
            var c = await dataRepository.AddAsync(newMedcineUsage);
            var newOne = mapper.Map<MedicineUsageDto>(c);
            return newOne;
        }

        public async Task DeleteAsync(int id)
        {
            await dataRepository.DeleteAsync(id);
        }

        public async Task<List<MedicineUsageDto>> GetAllAsync()
        {
            return mapper.Map<List<MedicineUsageDto>>(await dataRepository.GetAllAsync());
        }

        public async Task<MedicineUsageDto> GetByIdAsync(int id)
        {
            return mapper.Map<MedicineUsageDto>(await dataRepository.GetByIdAsync(id));
        }

        public async Task<MedicineUsageDto> UpdateAsync(int id, MedicineUsageDto entity)
        {
            var q = await dataRepository.UpdateAsync(id, mapper.Map<MedicineUsage>(entity));
            return mapper.Map<MedicineUsageDto>(q);
        }

        public async Task<List<MedicineUsageDto>> GetAllMedicineUsagesByIdAsync(int id)
        {
            return mapper.Map<List<MedicineUsageDto>>(await (dataRepository as MedicineUsageRepository).GetAllMedicineusagesByIdAsync(id));
        }

       
    }
}


