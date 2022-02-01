using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Universities.Data.Models
{
    public class UniversityEntity
    {
        public UniversityEntity()
        {
            this.Users = new HashSet<User>();
        }

        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Country { get; set; }

        [Required]
        [MaxLength(2)]
        public string AlphaTwoCode { get; set; }

        public string StateProvince { get; set; }

        public string WebPage { get; set; }

        public virtual ICollection<User> Users { get; set; }
    }
}
