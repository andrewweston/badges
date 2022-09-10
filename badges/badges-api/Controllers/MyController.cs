using badges_api.Helpers;
using badges_api.Models;
using System;
using System.Web.Http;
using log4net;
using System.Threading.Tasks;

namespace badges_api.Controllers
{
    public class MyController : ApiController
    {
        private static readonly ILog log = LogManager.GetLogger(typeof(WebApiApplication));

        // GET api/<controller>
        [HttpGet]
        [ScopeAuthorize("read:mydetails")]
        public async Task<IHttpActionResult> Get()
        {
            try
            {
                var person = new Entity
                {
                    id = IdentityHelper.GetId(User.Identity),
                    name = IdentityHelper.GetName(User.Identity),
                    email = IdentityHelper.GetEmail(User.Identity)
                };
                log.InfoFormat("GET My details#{0} suceeded", person.id);
                return Ok(person);
            }
            catch (Exception ex)
            {
                log.Error("GET My Details failed", ex);
                return InternalServerError();
            }
        }
    }
}