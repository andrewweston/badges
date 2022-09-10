using Auth0.Owin;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Jwt;
using Owin;
using System.Configuration;

namespace badges_api
{
    public class Startup
    {
        // Startup.cs

        public void Configuration(IAppBuilder app)
        {
            // Configure Auth0 parameters
            var domain = $"https://{ConfigurationManager.AppSettings["Auth0Domain"]}/";
            var apiIdentifier = ConfigurationManager.AppSettings["Auth0ApiIdentifier"];

            var keyResolver = new OpenIdConnectSigningKeyResolver(domain);
            app.UseJwtBearerAuthentication(
                new JwtBearerAuthenticationOptions
                {
                    AuthenticationMode = AuthenticationMode.Active,
                    TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidAudience = apiIdentifier,
                        ValidIssuer = domain,
                        IssuerSigningKeyResolver = (token, securityToken, kid, parameters) => keyResolver.GetSigningKey(kid)
                    }
                });


            //WebApiConfig.Configure(app);
        }
    }
}