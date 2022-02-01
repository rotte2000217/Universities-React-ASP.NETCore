using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Universities.Data;
using Universities.Data.Models;

namespace Universities.Services.University
{
    public class UniversitiesService : IUniversitiesService
    {
        private readonly UniversitiesDbContext _dbContext;
        private const string UsersColumnName = "Users";

        public UniversitiesService(UniversitiesDbContext dbContext)
        {
            this._dbContext = dbContext;
        }
        public IQueryable<UniversityEntity> GetAll() => this._dbContext.Universities.Include(UsersColumnName);

        public async Task<UniversityEntity> GetByIdAsync(int id) => await this._dbContext.Universities.FirstOrDefaultAsync(x => x.Id == id);

        public async Task<UniversityEntity> GetByNameAsync(string name) => await this._dbContext.Universities.FirstOrDefaultAsync(x => x.Name == name);

        public List<UniversityEntity> GetRecentlyAddedUniversities(int count)
        {
            count = count >= 10 ? 10 : count;

            var universitiesCount = this._dbContext.Universities.Count();

            if (universitiesCount == 0 || universitiesCount < count)
            {
                return new List<UniversityEntity>();
            }

            var universities = this._dbContext.Universities
                .OrderByDescending(x => x.Id)
                .Take(count)
                .ToList();

            return universities;
        }

        public IEnumerable<string> GetAllCountryNames() => this._dbContext.Universities.Select(x => x.Country).Distinct().AsEnumerable();
    }
}
