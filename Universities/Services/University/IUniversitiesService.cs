using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Universities.Data.Models;
using Universities.Models;

namespace Universities.Services.University
{
    public interface IUniversitiesService
    {
        public IQueryable<UniversityEntity> GetAll();

        public Task<UniversityEntity> GetByIdAsync(int id);

        public Task<UniversityEntity> GetByNameAsync(string name);

        public IEnumerable<UniversityEntityModel> GetByCountryAsync(string country, string userId);

        /// <summary>
        /// Gets recently added universities by specified count (Max 10).
        /// </summary>
        /// <param name="count"></param>
        /// <returns></returns>
        public List<UniversityEntityModel> GetRecentlyAddedUniversities(string userId, int count);

        public IEnumerable<string> GetAllCountryNames();
    }
}
