using Newtonsoft.Json.Linq;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Web.Http;
using System.Web.Http.Controllers;

namespace badges_api.Helpers
{
    public class ScopeAuthorizeAttribute : AuthorizeAttribute
    {
        private readonly string scope;

        public ScopeAuthorizeAttribute(string scope)
        {
            this.scope = scope;
        }

        public override void OnAuthorization(HttpActionContext actionContext)
        {
            base.OnAuthorization(actionContext);

            // Get the Auth0 domain, in order to validate the issuer
            var domain = $"https://{ConfigurationManager.AppSettings["Auth0Domain"]}/";

            // Get the claim principal
            var principal = actionContext.ControllerContext.RequestContext.Principal as ClaimsPrincipal;
            var identity = principal.Identity as ClaimsIdentity;

            // Get the user details
            var id_token = actionContext.Request.Headers.GetValues("Identity").Single().ToString();
            using (var client = new WebClient { BaseAddress = $"https://{ConfigurationManager.AppSettings["Auth0Domain"]}/" })
            {
                client.Headers[HttpRequestHeader.ContentType] = "application/x-www-form-urlencoded";
                client.Headers[HttpRequestHeader.CacheControl] = "no-cache";
                var profile = client.UploadString("/tokeninfo", "id_token=" + id_token);
                var email = JObject.Parse(profile).GetValue("email").ToString();
                var name = JObject.Parse(profile).GetValue("name").ToString();
                identity.AddClaim(new Claim("Email", email));
                identity.AddClaim(new Claim("Name", name));
            }

            // Get the scope clain. Ensure that the issuer is for the correcr Auth0 domain
            var scopeClaim = principal?.Claims.FirstOrDefault(c => c.Type == "scope" && c.Issuer == domain);
            if (scopeClaim != null)
            {
                // Split scopes
                var scopes = scopeClaim.Value.Split(' ');

                // Succeed if the scope array contains the required scope
                if (scopes.Any(s => s == scope))
                    return;
            }

            HandleUnauthorizedRequest(actionContext);
        }
    }

}