using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using Universities.Extensions;
using Universities.Models;
using Universities.Services.ExcelService;
using Universities.Services.Watchlist;

namespace Universities.Controllers
{
    public class WatchlistController : ApiController
    {
        private readonly IWatchlistService _watchlistService;
        private readonly IExcelService _excelService;

        public WatchlistController(IWatchlistService watchlistService, IExcelService excelService)
        {
            this._watchlistService = watchlistService;
            this._excelService = excelService;
        }

        [Authorize]
        [Route("Add")]
        public async Task<JsonResult> Add([FromBody]int universityId)
        {
            var userId = this.User.GetId();
            var result = await _watchlistService.AddToWatchlist(userId, universityId);
            return new JsonResult(result);
        }

        [Authorize]
        [Route("Get")]
        public JsonResult Get()
        {
            var userId = this.User.GetId();
            var universities = _watchlistService.GetWatchlist(userId);

            return new JsonResult(universities);
        }

        [Authorize]
        [Route("Export")]
        public FileContentResult Export()
        {
            string contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

            var userId = this.User.GetId();
            var universities = _watchlistService.GetWatchlist(userId);

            var memoryStreamArray = _excelService.GetExcelFileContent<UniversityEntityModel>(universities.ToList(), "Universities");

            var file = File(memoryStreamArray, contentType, "Watchlist.xlsx");

            return file;
        }
    }
}
