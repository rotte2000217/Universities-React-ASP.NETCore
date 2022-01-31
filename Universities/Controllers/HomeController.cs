using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Net;
using Universities.Models;

namespace Universities.Controllers
{
    public class HomeController : ApiController
    {
        [Authorize]
        public IActionResult Get()
        {
            return Ok("Success");
        }
    }
}
