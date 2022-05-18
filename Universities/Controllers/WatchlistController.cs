using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Threading.Tasks;
using Universities.Extensions;
using Universities.Services.Watchlist;

namespace Universities.Controllers
{
    public class WatchlistController : ApiController
    {
        private readonly IWatchlistService _watchlistService;

        public WatchlistController(IWatchlistService watchlistService)
        {
            this._watchlistService = watchlistService;
        }

        [Authorize]
        [Route("Add")]
        public async Task<JsonResult> Add([FromBody]int universityId)
        {
            var userId = this.User.GetId();
            var result = await this._watchlistService.AddToWatchlist(userId, universityId);
            return new JsonResult(result);
        }

        [Authorize]
        [Route("Get")]
        public JsonResult Get()
        {
            var userId = this.User.GetId();
            var universities = this._watchlistService.GetWatchlist(userId);

            //var result = JsonSerializer.Serialize(universities);

            return new JsonResult(universities);
        }
    }
}
