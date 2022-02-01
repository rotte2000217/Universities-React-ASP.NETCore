using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Universities.Extensions;
using Universities.Services.University;

namespace Universities.Controllers
{
    public class HomeController : ApiController
    {
        private readonly IUniversitiesService _universitiesService;

        public HomeController(IUniversitiesService universitiesService)
        {
            this._universitiesService = universitiesService;
        }

        [Authorize]
        public JsonResult Get()
        {
            var recentUnis = this._universitiesService.GetRecentlyAddedUniversities(10);
            var userId = this.User.GetId();

            return new JsonResult(recentUnis);
        }
    }
}
