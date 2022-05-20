using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
            var userId = this.User.GetId();
            var recentUnis = this._universitiesService.GetRecentlyAddedUniversities(userId, 10);

            return new JsonResult(recentUnis);
        }
    }
}
