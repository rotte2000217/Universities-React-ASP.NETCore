using System.Linq;
using Universities.Data.Models;

namespace Universities.Models
{
    public class UniversityEntityModel
    {
        public UniversityEntityModel()
        {

        }

        public UniversityEntityModel(UniversityEntity src, string userId)
        {
            this.AlphaTwoCode = src.AlphaTwoCode;
            this.StateProvince = src.StateProvince;
            this.Country = src.Country;
            this.WebPage = src.WebPage;
            this.Id = src.Id;
            this.Name = src.Name;
            this.IsWatchlisted = src.Users
                                .Select(u => u.Id)
                                .Contains(userId);
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public string Country { get; set; }

        public string AlphaTwoCode { get; set; }

        public string StateProvince { get; set; }

        public string WebPage { get; set; }

        public bool IsWatchlisted { get; set; }
    }
}
