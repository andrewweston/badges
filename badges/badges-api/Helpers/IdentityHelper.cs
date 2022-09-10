using System.Linq;
using System.Security.Claims;
using System.Security.Principal;

namespace badges_api.Helpers
{
    public static class IdentityHelper
    {
        public static string GetEmail(IIdentity Identity)
        {
            return ((ClaimsIdentity)Identity).Claims.Where(c => c.Type == "Email").Single().Value;
        }

        public static string GetName(IIdentity Identity)
        {
            return ((ClaimsIdentity)Identity).Claims.Where(c => c.Type == "Name").Single().Value;
        }

        public static string GetId(IIdentity Identity)
        {
            return GetId(GetEmail(Identity));
        }

        public static string GetId(string email)
        {
            return email.Replace('.', '_');
        }
    }
}