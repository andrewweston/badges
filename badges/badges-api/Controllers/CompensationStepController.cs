using badges_api.Helpers;
using badges_api.Models;
using System;
using System.Linq;
using System.Web.Http;
using log4net;
using badges_api.Repository;

namespace badges_api.Controllers
{
    public class CompensationStepController : ApiController
    {
        private static readonly ILog log = LogManager.GetLogger(typeof(WebApiApplication));

        private CompensationStepRepository GetRepository()
        {
            return new CompensationStepRepository();
        }

        // GET api/<controller>
        [HttpGet]
        [ScopeAuthorize("list:compensation")]
        public IHttpActionResult Get() //  IEnumerable<GradesModel>
        {
            try
            {
                var compensationSteps = GetRepository().Get();
                log.InfoFormat("GET Compensation Steps: {0} steps", compensationSteps.Count());
                return Ok(compensationSteps);
            }
            catch (Exception ex)
            {
                log.Error("GET Compensation Steps failed", ex);
                return InternalServerError();
            }
        }

        // PUT api/<controller>
        [HttpPut]
        [ScopeAuthorize("update:compensation")]
        public IHttpActionResult Put(string id, [FromBody] CompensationStep compensationStep)
        {
            try
            {
                compensationStep.id = id;
                var result = GetRepository().Update(compensationStep);
                log.InfoFormat("PUT Compensation Step#{0} suceeded", id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                log.Error(string.Format("PUT Compensation Step#{0} failed", id), ex);
                return InternalServerError(new ApplicationException("Failed to update the compensation step. It might have been deleted. Please refresh your browser"));
            }
        }

        // POST api/<controller>
        [HttpPost]
        [ScopeAuthorize("create:compensation")]
        public IHttpActionResult Post([FromBody] CompensationStep compensationStep)
        {
            try
            {
                var result = GetRepository().Create(compensationStep);
                log.InfoFormat("POST Compensation Step {0} suceeded", compensationStep.name);
                return Ok(result);
            }
            catch (Exception ex)
            {
                log.Error(string.Format("POST Compensation Step {0} failed", compensationStep.name), ex);
                return InternalServerError();
            }
        }

        // POST api/<controller>
        [HttpDelete]
        [ScopeAuthorize("delete:compensation")]
        public IHttpActionResult Delete([FromBody] CompensationStep compensationStep)
        {
            try
            {
                GetRepository().Delete(compensationStep.id);
                log.InfoFormat("DELETE Compensation Step {0} suceeded", compensationStep.id);
                return Ok();
            }
            catch (Exception ex)
            {
                log.Error(string.Format("DELETE Compensation Step {0} failed", compensationStep.id), ex);
                return InternalServerError();
            }
        }
    }
}