using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Universities.Data.Models;

namespace Universities.Data
{
    public class UniversitiesDbContext : IdentityDbContext<User>
    {
        public UniversitiesDbContext(DbContextOptions<UniversitiesDbContext> options)
            : base(options)
        {
        }

        public DbSet<UniversityEntity> Universities { get; set; }
    }
}
