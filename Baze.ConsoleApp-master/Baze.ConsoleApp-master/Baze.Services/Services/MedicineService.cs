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
    public class MedicineService : IDataService<MedicineDto>
    {
        private readonly IDataRepository<Medicine> dataRepository;
        private readonly IMapper mapper;
        public MedicineService(IDataRepository<Medicine> dataRepository, IMapper mapper)
        {
            this.dataRepository = dataRepository;
            this.mapper = mapper;
        }

        public async Task<MedicineDto> AddAsync(MedicineDto entity)
        {
            Medicine newMedicine = mapper.Map<Medicine>(entity);
            var c = await dataRepository.AddAsync(newMedicine);
            var newOne = mapper.Map<MedicineDto>(c);
            return newOne;
        }

        public async Task DeleteAsync(int id)
        {
            await dataRepository.DeleteAsync(id);
        }

        public async Task<List<MedicineDto>> GetAllAsync()
        {
            return mapper.Map<List<MedicineDto>>(await dataRepository.GetAllAsync());
        }

        public async Task<MedicineDto> GetByIdAsync(int id)
        {
            return mapper.Map<MedicineDto>(await dataRepository.GetByIdAsync(id));
        }

        public async Task<MedicineDto> UpdateAsync(int id, MedicineDto entity)
        {
            var q = await dataRepository.UpdateAsync(id, mapper.Map<Medicine>(entity));
            return mapper.Map<MedicineDto>(q);
        }
    }
}


