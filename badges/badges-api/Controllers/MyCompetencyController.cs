using badges_api.Helpers;
using badges_api.Models;
using badges_api.Repository;
using log4net;
using System;
using System.Web.Http;

namespace badges_api.Controllers
{
    public class MyCompetencyController : ApiController
    {
        private static readonly ILog log = LogManager.GetLogger(typeof(WebApiApplication));

        private EntityCompetencyRepository GetRepository()
        {
            return new EntityCompetencyRepository();
        }

        [HttpGet]
        [ScopeAuthorize("list:mycompetency")]
        public IHttpActionResult Get()
        {
            try
            {
                var evaluation = GetRepository().Get(IdentityHelper.GetId(User.Identity));
                log.InfoFormat("GET my evaluation for entity {0} suceeded", IdentityHelper.GetId(User.Identity));
                return Ok(evaluation);
            }
            catch (Exception ex)
            {
                log.Error(string.Format("GET my evaluation for entity {0} failed", IdentityHelper.GetId(User.Identity)), ex);
                return InternalServerError();
            }
        }

        // POST api/<controller>
        [HttpPost]
        [ScopeAuthorize("update:mycompetency")]
        public IHttpActionResult Post([FromBody] Evaluation evaluation)
        {
            try
            {
                GetRepository().Update(IdentityHelper.GetId(User.Identity), evaluation.data);
                log.InfoFormat("POST my evaluation {0} suceeded", IdentityHelper.GetId(User.Identity));
                return Ok();
            }
            catch (Exception ex)
            {
                log.Error(string.Format("POST my evaluation {0} failed", IdentityHelper.GetId(User.Identity)), ex);
                return InternalServerError();
            }
        }
    }
}