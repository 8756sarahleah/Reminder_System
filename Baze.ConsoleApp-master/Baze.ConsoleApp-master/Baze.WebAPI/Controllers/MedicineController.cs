using Baze.Common.DTO_s;
using Baze.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Baze.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicineController : ControllerBase
    {
        private readonly IDataService<MedicineDto> _medicineServise;
        public MedicineController(IDataService<MedicineDto> _medicineServise)
        {
            this._medicineServise = _medicineServise;
        }

        [HttpGet]
        public async Task<List<MedicineDto>> Get()
        {
            return await _medicineServise.GetAllAsync();
        }

        [HttpGet("{id}")]
        public async Task<MedicineDto> Get(int id)
        {
            return await _medicineServise.GetByIdAsync(id);

        }

        [HttpPost]
        public async Task<MedicineDto> Post([FromBody] MedicineDto client)
        {
            return await _medicineServise.AddAsync(client);
        }

        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody] MedicineDto client)
        {
            await _medicineServise.UpdateAsync(id, client);
        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _medicineServise.DeleteAsync(id);
        }
    }
}
