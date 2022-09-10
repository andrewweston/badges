using badges_api.Helpers;
using badges_api.Models;
using System;
using System.Linq;
using System.Web.Http;
using log4net;
using badges_api.Repository;

namespace badges_api.Controllers
{
    public class CompetencyController : ApiController
    {
        private static readonly ILog log = LogManager.GetLogger(typeof(WebApiApplication));

        private CompetencyRepository GetRepository()
        {
            return new CompetencyRepository();
        }

        private BehaviourRepository GetBehaviourRepository()
        {
            return new BehaviourRepository();
        }

        private CompetencyTagRepository GetCompetencyTagRepository()
        {
            return new CompetencyTagRepository();
        }

        private TagRepository GetTagRepository()
        {
            return new TagRepository();
        }

        // GET api/<controller>
        [HttpGet]
        [ScopeAuthorize("list:competency")]
        public IHttpActionResult Get() //  IEnumerable<Competency>
        {
            try
            {
                var competencies = GetRepository().Get();
                var behaviours = GetBehaviourRepository().Get();
                var tags = GetCompetencyTagRepository().Get();
                competencies.ToList().ForEach(c =>
                {
                    c.behaviours = behaviours[c.id];
                    c.tags = tags[c.id];
                });

                log.InfoFormat("GET Competencies: {0} competencies", competencies.Count());
                return Ok(competencies);
            }
            catch (Exception ex)
            {
                log.Error("GET Competencies failed", ex);
                return InternalServerError();
            }
        }
        
        // PUT api/<controller>
        [HttpPut]
        [ScopeAuthorize("update:competency")]
        public IHttpActionResult Put(string id, [FromBody] Competency competency)
        {
            try
            {
                competency.id = id;
                var result = GetRepository().Update(competency);
                result.behaviours = GetBehaviourRepository().Update(id, competency.behaviours);
                var tags = GetTagRepository().CreateMissing(competency.tags);
                result.tags = GetCompetencyTagRepository().Update(id, tags.Select(t => t.id));

                log.InfoFormat("PUT Competency#{0} suceeded", id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                log.Error(string.Format("PUT Competency#{0} failed", id), ex);
                return InternalServerError(new ApplicationException("Failed to update the competency. It might have been deleted. Please refresh your browser"));
            }
        }

        // POST api/<controller>
        [HttpPost]
        [ScopeAuthorize("create:competency")]
        public IHttpActionResult Post([FromBody] Competency competency)
        {
            try
            {
                var result = GetRepository().Create(competency);
                result.behaviours = GetBehaviourRepository().Update(result.id, competency.behaviours);
                var tags = GetTagRepository().CreateMissing(competency.tags);
                result.tags = GetCompetencyTagRepository().Update(result.id, tags.Select(t => t.id));
                log.InfoFormat("POST Competency {0} suceeded", competency.name);
                return Ok(result);
            }
            catch (Exception ex)
            {
                log.Error(string.Format("POST Competency {0} failed", competency.name), ex);
                return InternalServerError();
            }
        }

        // POST api/<controller>
        [HttpDelete]
        [ScopeAuthorize("delete:competency")]
        public IHttpActionResult Delete([FromBody] Competency competency)
        {
            try
            {
                GetRepository().Delete(competency.id);
                log.InfoFormat("DELETE Competency {0} suceeded", competency.id);
                return Ok();
            }
            catch (Exception ex)
            {
                log.Error(string.Format("DELETE Competency {0} failed", competency.id), ex);
                return InternalServerError();
            }
        }
    }
}