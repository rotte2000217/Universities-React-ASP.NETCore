using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Universities.Data.Models;

namespace Universities.Services.University
{
    public interface IUniversitiesService
    {
        public IQueryable<UniversityEntity> GetAll();

        public Task<UniversityEntity> GetByIdAsync(int id);

        public Task<UniversityEntity> GetByNameAsync(string name);

        /// <summary>
        /// Gets recently added universities by specified count (Max 10).
        /// </summary>
        /// <param name="count"></param>
        /// <returns></returns>
        public List<UniversityEntity> GetRecentlyAddedUniversities(int count);

        public IEnumerable<string> GetAllCountryNames();
    }
}
