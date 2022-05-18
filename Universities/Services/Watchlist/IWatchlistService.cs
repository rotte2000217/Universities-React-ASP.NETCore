using System.Collections.Generic;
using System.Threading.Tasks;
using Universities.Data.Models;
using Universities.Models;

namespace Universities.Services.Watchlist
{
    public interface IWatchlistService
    {
        Task<AddToWatchlistResponseModel> AddToWatchlist(string userId, int universityId);

        IEnumerable<UniversityEntityModel> GetWatchlist(string userId);
    }
}
