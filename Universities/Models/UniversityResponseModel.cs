using Newtonsoft.Json;

namespace Universities.Models
{

    public class UniversityResponseModel
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("country")]
        public string Country { get; set; }

        [JsonProperty("web_pages")]
        public string[] WebPages { get; set; }

        [JsonProperty("alpha_two_code")]
        public string AlphaTwoCode { get; set; }

        [JsonProperty("state-province")]
        public string StateProvince { get; set; }

        [JsonProperty("domains")]
        public string[] Domains { get; set; }
    }
}
