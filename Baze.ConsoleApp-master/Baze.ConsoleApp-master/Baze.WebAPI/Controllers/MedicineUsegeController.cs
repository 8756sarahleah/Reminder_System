using Baze.Common.DTO_s;
using Baze.Services.Interfaces;
using Baze.Services.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Baze.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicineUsageController : ControllerBase
    {
        private readonly IDataService<MedicineUsageDto> _medicineUsageServise;
        public MedicineUsageController(IDataService<MedicineUsageDto> _MedicineUsageServise)
        {
            this._medicineUsageServise = _MedicineUsageServise;
        }

        [HttpGet]
        public async Task<List<MedicineUsageDto>> Get()
        {
            return await _medicineUsageServise.GetAllAsync();

        }

        [HttpGet("{clientId}")]
        public async Task<List<MedicineUsageDto>> Get(int clientId)
        {
            return await (_medicineUsageServise as MedicineUsageService).GetAllMedicineUsagesByIdAsync(clientId);

        }
        [HttpPost]
        public async Task<MedicineUsageDto> Post([FromBody] MedicineUsageDto medicineUsage)
        {
            return await _medicineUsageServise.AddAsync(medicineUsage);
        }
        

        [HttpPut("{id}")]
        public async Task<MedicineUsageDto> Put(int id, [FromBody] MedicineUsageDto medicineUsage)
        {
           return await _medicineUsageServise.UpdateAsync(id, medicineUsage);
        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _medicineUsageServise.DeleteAsync(id);
        }
    }
}

