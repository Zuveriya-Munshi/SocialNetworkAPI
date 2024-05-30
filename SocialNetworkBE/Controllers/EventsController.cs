using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SocialNetworkBE.Models;
using System.Data.SqlClient;

namespace SocialNetworkBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public IConfiguration Configuration => _configuration;

        public EventsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpPost]
        [Route("AddEvent")]
        public Response AddEvent(Events events)
        {
            Response response = new Response();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("SNCon").ToString());
            Dal dal = new Dal();
            response = dal.AddEvent(events, connection);
            return response;
        }
        [HttpGet]
        [Route("EventList")]
        public Response EventList()
        {
            Response response = new Response();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("SNCon").ToString());
            Dal dal = new Dal();
            response = dal.EventList(connection);
            return response;
        }

    }
}
