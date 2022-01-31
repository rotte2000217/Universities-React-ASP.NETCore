using Universities.Data.Models;

namespace Universities.Services.Identity
{
    public interface IIdentityServices
    {
        public string GetEncryptedJWT(User user, string secret);
    }
}
