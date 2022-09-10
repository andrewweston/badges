using badges_api.Helpers;
using badges_api.Models;
using badges_api.Repository;
using log4net;
using System;
using System.Web.Http;

namespace badges_api.Controllers
{
    public class EntityCompetencyController : ApiController
    {
        private static readonly ILog log = LogManager.GetLogger(typeof(WebApiApplication));

        private EntityCompetencyRepository GetRepository()
        {
            return new EntityCompetencyRepository();
        }

        [HttpGet]
        [ScopeAuthorize("list:entitycompetency")]
        public IHttpActionResult Get(string id)
        {
            try
            {
                var evaluation = GetRepository().Get(id);
                log.InfoFormat("GET evaluation for entity {0} suceeded", id);
                return Ok(evaluation);
            }
            catch (Exception ex)
            {
                log.Error(string.Format("GET evaluation for entity {0} failed", id), ex);
                return InternalServerError();
            }
        }

        // POST api/<controller>
        [HttpPost]
        [ScopeAuthorize("update:entitycompetency")]
        public IHttpActionResult Post(string id, [FromBody] Evaluation evaluation)
        {
            try
            {
                GetRepository().Update(id, evaluation.data);
                log.InfoFormat("POST evaluation for entity {0} suceeded", id);
                return Ok();
            }
            catch (Exception ex)
            {
                log.Error(string.Format("POST evaluation for entity {0} failed", id), ex);
                return InternalServerError();
            }
        }
    }
}