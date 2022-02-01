using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace Universities.Data.Models
{
    public class User : IdentityUser
    {
        public User()
        {
            this.Universities = new HashSet<UniversityEntity>();
        }

        public virtual ICollection<UniversityEntity> Universities { get; set; }
    }
}
