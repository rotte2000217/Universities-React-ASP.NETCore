using Microsoft.AspNetCore.Mvc;

namespace Universities.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public abstract class ApiController : ControllerBase
    {
    }
}
