using badges_api.Helpers;
using badges_api.Models;
using badges_api.Repository;
using log4net;
using System;
using System.Linq;
using System.Web.Http;

namespace badges_api.Controllers
{
    public class OccupationController : ApiController
    {
        private static readonly ILog log = LogManager.GetLogger(typeof(WebApiApplication));

        private OccupationRepository GetOccupationRepository()
        {
            return new OccupationRepository();
        }

        private OccupationCompetencyRepository GetOccupationCompetencyRepository()
        {
            return new OccupationCompetencyRepository();
        }

        private OccupationStageRepository GetOccupationStageRepository()
        {
            return new OccupationStageRepository();
        }

        private ProficiencyMapRepository GetProficiencyMapRepository()
        {
            return new ProficiencyMapRepository();
        }

        // GET api/<controller>
        [HttpGet]
        [ScopeAuthorize("list:occupation")]
        public IHttpActionResult Get() 
        {
            try
            {
                //occupations
                var occupations = GetOccupationRepository().Get();

                var occupationCompetencies = GetOccupationCompetencyRepository().Get();
                var occupationStages = GetOccupationStageRepository().Get();
                //var proficiencyMap = GetProficiencyMapRepository().Get();

                occupations.ToList().ForEach(s => {
                    s.competencies = occupationCompetencies[s.id];
                    s.stages = occupationStages[s.id];
                    //s.proficiencyMap = proficiencyMap[s.id];
                });

                log.InfoFormat("GET occupations: {0} occupations", occupations.Count());
                return Ok(occupations);
            }
            catch (Exception ex)
            {
                log.Error("GET occupations failed", ex);
                return InternalServerError();
            }
        }

        // GET api/<controller>/id
        [HttpGet]
        [ScopeAuthorize("read:occupation")]
        public IHttpActionResult Get(string id)
        {
            try
            {
                //get occupation and its badges
                var occupation = GetOccupationRepository().Get(id);
                occupation.competencies = GetOccupationCompetencyRepository().GetForOccupation(id);
                occupation.stages = GetOccupationStageRepository().GetForOccupation(id);
                occupation.proficiencyMap = GetProficiencyMapRepository().Get(id);

                log.InfoFormat("GET occupation#{0} suceeded", id);
                return Ok(occupation);
            }
            catch (Exception ex)
            {
                log.Error(String.Format("GET occupation#{0} failed", id), ex);
                return InternalServerError();
            }
        }

        // PUT api/<controller>
        [HttpPut]
        [ScopeAuthorize("update:occupation")]
        public IHttpActionResult Put(string id, [FromBody] Occupation occupation)
        {
            try
            {
                occupation.id = id;
                if (occupation.optionsCount < 1)
                {
                    occupation.optionsCount = 1;
                }
                if (occupation.competencies != null && 
                    occupation.optionsCount > occupation.competencies.Count(c => c.category != Mappers.OccupationCompetencyMapper.Category.required)
                )
                {
                    occupation.optionsCount = occupation.competencies.Count(c => c.category != Mappers.OccupationCompetencyMapper.Category.required);
                }
                var result = GetOccupationRepository().Update(occupation);
                result.competencies = GetOccupationCompetencyRepository().Update(id, occupation.competencies);
                result.stages = GetOccupationStageRepository().Update(id, occupation.stages);
                result.proficiencyMap = GetProficiencyMapRepository().Update(id, occupation.proficiencyMap);
                log.InfoFormat("PUT occupation#{0} suceeded", id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                log.Error(string.Format("PUT occupation#{0} failed", id), ex);
                return InternalServerError(new ApplicationException("Failed to update the occupation. It might have been deleted. Please refresh your browser"));
            }
        }

        // POST api/<controller>
        [HttpPost]
        [ScopeAuthorize("create:occupation")]
        public IHttpActionResult Post([FromBody] Occupation occupation)
        {
            try
            {
                if (occupation.optionsCount < 1)
                {
                    occupation.optionsCount = 1;
                }
                if (occupation.competencies != null && occupation.optionsCount > occupation.competencies.Count(c => c.category != Mappers.OccupationCompetencyMapper.Category.required))
                {
                    occupation.optionsCount = occupation.competencies.Count(c => c.category != Mappers.OccupationCompetencyMapper.Category.required);
                }

                var result = GetOccupationRepository().Create(occupation);
                result.competencies = GetOccupationCompetencyRepository().Update(result.id, occupation.competencies);
                result.stages = GetOccupationStageRepository().Update(result.id, occupation.stages);
                result.proficiencyMap = GetProficiencyMapRepository().Update(result.id, occupation.proficiencyMap);
                log.InfoFormat("POST occupation {0} suceeded", occupation.name);
                return Ok(result);
            }
            catch (Exception ex)
            {
                log.Error(string.Format("POST occupation {0} failed", occupation.name), ex);
                return InternalServerError();
            }
        }

        // DELETE api/<controller>
        [HttpDelete]
        [ScopeAuthorize("delete:occupation")]
        public IHttpActionResult Delete([FromBody] Occupation occupation)
        {
            try
            {
                GetOccupationRepository().Delete(occupation.id);
                log.InfoFormat("DELETE occupation {0} suceeded", occupation.id);
                return Ok();
            }
            catch (Exception ex)
            {
                log.Error(string.Format("DELETE occupation {0} failed", occupation.id), ex);
                return InternalServerError();
            }
        }
    }
}