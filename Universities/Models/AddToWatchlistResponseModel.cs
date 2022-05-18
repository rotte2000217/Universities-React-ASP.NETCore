using System.Collections.Generic;

namespace Universities.Models
{
    public class AddToWatchlistResponseModel
    {
        public IEnumerable<UniversityEntityModel> Universities { get; set; }

        public string ResponseMessage { get; set; }
    }
}
