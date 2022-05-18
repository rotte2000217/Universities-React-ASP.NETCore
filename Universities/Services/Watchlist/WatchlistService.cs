using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Universities.Data;
using Universities.Data.Models;
using Universities.Models;

namespace Universities.Services.Watchlist
{
    public class WatchlistService : IWatchlistService
    {
        private readonly UniversitiesDbContext _dbContext;

        public WatchlistService(UniversitiesDbContext dbContext)
        {
            this._dbContext = dbContext;
        }

        public async Task<AddToWatchlistResponseModel> AddToWatchlist(string userId, int universityId)
        {
            try
            {
                var university = this._dbContext
                    .Universities
                    .Where(x => x.Id == universityId)
                    ?.Include(x => x.Users)
                    ?.FirstOrDefault();

                var user = this._dbContext
                    .Users
                    .Where(x => x.Id == userId)
                    ?.Include(x => x.Universities)
                    ?.FirstOrDefault();

                if (university.Users.Contains(user) ||
                    user.Universities.Contains(university))
                {
                    return new AddToWatchlistResponseModel
                    {
                        Universities = this.GetWatchlist(userId),
                        ResponseMessage = $"{university.Name} is already in your watchlist!"

                    };
                }

                university.Users.Add(user);
                user.Universities.Add(university);

                await this._dbContext.SaveChangesAsync();

                return new AddToWatchlistResponseModel
                {
                    Universities = this.GetWatchlist(userId),
                    ResponseMessage = $"Successfully added {university.Name} to your watchlist!"

                };
            }
            catch (System.Exception msg)
            {
                return new AddToWatchlistResponseModel
                {
                    Universities = this.GetWatchlist(userId),
                    ResponseMessage = $"An error has occured: {msg.Message}"

                };
            }

        }

        public IEnumerable<UniversityEntityModel> GetWatchlist(string userId)
        {
            var user = this._dbContext.Users.Where(x => x.Id == userId).Include(x => x.Universities).FirstOrDefault();
            var universityIds = user.Universities.Select(x => x.Id);

            var universities = this._dbContext
               .Universities
               .Where(x => universityIds.Contains(x.Id))
               .Select(x => new UniversityEntityModel
               {
                   Id = x.Id,
                   Name = x.Name,
                   StateProvince = x.StateProvince,
                   AlphaTwoCode = x.AlphaTwoCode,
                   Country = x.Country,
                   WebPage = x.WebPage
               })
               .ToList();

            return universities;
        }
    }
}
