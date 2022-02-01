using System.Linq;
using System.Security.Claims;

namespace Universities.Extensions
{
    public static class IdentityExtensions
    {
        public static string GetId(this ClaimsPrincipal user)
        {
            var userId = user
                .Claims
                .FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)
                ?.Value;

            return userId;
        }
    }
}
