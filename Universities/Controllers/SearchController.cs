using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Universities.Services.University;

namespace Universities.Controllers
{
    [Authorize]
    public class SearchController : ApiController
    {
        private readonly IUniversitiesService _universityServices;

        public SearchController(IUniversitiesService universityServices)
        {
            this._universityServices = universityServices;
        }

        [Route(nameof(GetCountries))]
        public JsonResult GetCountries()
        {
            try
            {
                var countries = this._universityServices.GetAllCountryNames();
                return new JsonResult(Ok(countries));
            }
            catch (System.Exception e)
            {
                return new JsonResult(BadRequest(e.Message));
            }
        }

        [Route(nameof(GetUniversitiesByCountry))]
        public JsonResult GetUniversitiesByCountry(string country)
        {
            try
            {
                var universities = this._universityServices.GetByCountryAsync(country);
                return new JsonResult(Ok(universities));
            }
            catch (System.Exception e)
            {
                return new JsonResult(BadRequest(e.Message));
            }
        }
    }
}
