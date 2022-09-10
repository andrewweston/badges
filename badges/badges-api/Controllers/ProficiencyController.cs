using badges_api.Helpers;
using badges_api.Models;
using System;
using System.Linq;
using System.Web.Http;
using log4net;
using badges_api.Repository;

namespace badges_api.Controllers
{
    public class ProficiencyController : ApiController
    {
        private static readonly ILog log = LogManager.GetLogger(typeof(WebApiApplication));

        private ProficiencyRepository GetRepository()
        {
            return new ProficiencyRepository();
        }

        // GET api/<controller>
        [HttpGet]
        [ScopeAuthorize("list:proficiency")]
        public IHttpActionResult Get() 
        {
            try
            {
                var proficiencies = GetRepository().Get();
                log.InfoFormat("GET Proficiencies: {0} Proficiencies", proficiencies.Count());
                return Ok(proficiencies);
            }
            catch (Exception ex)
            {
                log.Error("GET Proficiencies failed", ex);
                return InternalServerError();
            }
        }

        // PUT api/<controller>
        [HttpPut]
        [ScopeAuthorize("update:proficiency")]
        public IHttpActionResult Put(string id, [FromBody] Proficiency proficiency)
        {
            try
            {
                proficiency.id = id;
                var result = GetRepository().Update(proficiency);
                log.InfoFormat("PUT Proficiency#{0} suceeded", id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                log.Error(string.Format("PUT Proficiency#{0} failed", id), ex);
                return InternalServerError(new ApplicationException("Failed to update the proficiency. It might have been deleted. Please refresh your browser"));
            }
        }

        // POST api/<controller>
        [HttpPost]
        [ScopeAuthorize("create:proficiency")]
        public IHttpActionResult Post([FromBody] Proficiency proficiency)
        {
            try
            {
                var result = GetRepository().Create(proficiency);
                log.InfoFormat("POST Proficiency {0} suceeded", proficiency.name);
                return Ok(result);
            }
            catch (Exception ex)
            {
                log.Error(string.Format("POST Proficiency {0} failed", proficiency.name), ex);
                return InternalServerError();
            }
        }

        // POST api/<controller>
        [HttpDelete]
        [ScopeAuthorize("delete:proficiency")]
        public IHttpActionResult Delete([FromBody] Proficiency proficiency)
        {
            try
            {
                GetRepository().Delete(proficiency.id);
                log.InfoFormat("DELETE Proficiency {0} suceeded", proficiency.id);
                return Ok();
            }
            catch (Exception ex)
            {
                log.Error(string.Format("DELETE Proficiency {0} failed", proficiency.id), ex);
                return InternalServerError();
            }
        }
    }
}