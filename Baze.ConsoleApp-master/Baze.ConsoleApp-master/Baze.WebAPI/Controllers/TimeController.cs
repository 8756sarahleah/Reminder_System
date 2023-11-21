using Baze.Common.DTO_s;
using Baze.Services.Interfaces;
using Baze.Services.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Baze.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TimeController : ControllerBase
    {
        private readonly IDataService<TimeDto> _timeServise;
        public TimeController(IDataService<TimeDto> _timeServise)
        {
            this._timeServise = _timeServise;
        }

        [HttpGet]
        public async Task<List<TimeDto>> Get()
        {
            return await _timeServise.GetAllAsync();

        }

        [HttpGet("{medicineUsageId}")]
        public async Task<List<TimeDto>> Get(int medicineUsageId)
        {
            return await( _timeServise as TimeService).GetByMedicineUsageIdAsync(medicineUsageId);
        }

        [HttpPost]
        public async Task<TimeDto> Post([FromBody] TimeDto hour)
        {
            return await _timeServise.AddAsync(hour);
        }

        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody] TimeDto hour)
        {
            await _timeServise.UpdateAsync(id, hour);
        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _timeServise.DeleteAsync(id);
        }
    }
}
