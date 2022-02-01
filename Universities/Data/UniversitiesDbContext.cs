using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.IO;
using System.Linq;
using System.Net;
using Universities.Data.Models;
using Universities.Models;

namespace Universities.Data
{
    public class UniversitiesDbContext : IdentityDbContext<User>
    {
        public UniversitiesDbContext(DbContextOptions<UniversitiesDbContext> options)
            : base(options)
        {
        }

        public DbSet<UniversityEntity> Universities { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            var url = $"http://universities.hipolabs.com/search";

            WebRequest request = HttpWebRequest.Create(url);
            WebResponse response = request.GetResponse();

            StreamReader reader = new StreamReader(response.GetResponseStream());

            string responseText = reader.ReadToEnd();
            UniversityResponseModel[] universityModels = JsonConvert.DeserializeObject<UniversityResponseModel[]>(responseText);

            var id = 1;
            var universities = universityModels
                .Select(x => new UniversityEntity
                {
                    Id = id++,
                    Name = x.Name,
                    AlphaTwoCode = x.AlphaTwoCode,
                    Country = x.Country,
                    StateProvince = x.StateProvince,
                    WebPage = x.WebPages?.FirstOrDefault()
                })
                .ToArray();

            builder.Entity<UniversityEntity>().HasData(universities);
        }
    }
}
