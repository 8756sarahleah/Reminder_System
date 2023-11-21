using Baze.Common.DTO_s;
using Baze.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Baze.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly IDataService<ClientDto> _clientServise;
        public ClientController(IDataService<ClientDto> _clientServise)
        {
            this._clientServise = _clientServise;
        }

        [HttpGet]
        public async Task<List<ClientDto>> Get()
        {
            return await _clientServise.GetAllAsync();

        }

        [HttpGet("{id}")]
        public async Task<ClientDto> Get(int id)
        {
            return await _clientServise.GetByIdAsync(id);

        }

        [HttpPost]
        public async Task<ClientDto> Post([FromBody] ClientDto client)
        {
            return await _clientServise.AddAsync(client);
        }

        [HttpPut("{id}")]
        public async Task<ClientDto> Put(int id, [FromBody] ClientDto client)
        {
           return  await _clientServise.UpdateAsync(id, client);
        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _clientServise.DeleteAsync(id);
        }
    }
}
