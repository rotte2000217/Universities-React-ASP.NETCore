using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Universities.Extensions;
using Universities.Models;
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

        [Authorize]
        [Route("Export")]
        public FileContentResult Export()
        {
            var lines = new List<string>();
            var userId = this.User.GetId();
            var universities = this._watchlistService.GetWatchlist(userId);

            IEnumerable<PropertyDescriptor> props = TypeDescriptor.GetProperties(typeof(UniversityEntityModel)).OfType<PropertyDescriptor>();
            var header = string.Join(",", props.ToList().Select(x => x.Name));
            lines.Add(header);
            var valueLines = universities.Select(row => string.Join(",", header.Split(',').Select(a => row.GetType().GetProperty(a).GetValue(row, null))));
            lines.AddRange(valueLines);

            MemoryStream memoryStream = new MemoryStream();
            TextWriter tw = new StreamWriter(memoryStream);

            foreach (var line in lines)
            {
                tw.WriteLine(line);
            }
            tw.Flush();
            tw.Close();

            var file = File(memoryStream.GetBuffer(), "text/plain");

            return file;
        }
    }
}
