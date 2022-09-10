using badges_api.Helpers;
using badges_api.Models;
using badges_api.Repository;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace badges_api.Controllers
{
    public class EntityOccupationController : ApiController
    {
        private static readonly ILog log = LogManager.GetLogger(typeof(WebApiApplication));

        private EntityOccupationRepository GetRepository()
        {
            return new EntityOccupationRepository();
        }

        private EntityCompetencyRepository GetBadgeRepository()
        {
            return new EntityCompetencyRepository();
        }

        private ProficiencyRepository GetProficiencyRepository()
        {
            return new ProficiencyRepository();
        }

        private EntityCompetencyRepository GetEntityCompetencyRepository()
        {
            return new EntityCompetencyRepository();
        }

        private ProficiencyMapRepository GetProficiencyMapRepository()
        {
            return new ProficiencyMapRepository();
        }

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


        private void populateStages(string id, EntityOccupations occupations)
        {
            //stages
            var badges = GetEntityCompetencyRepository().Get(id);
            var proficiencies = GetProficiencyRepository().Get();
            var occupationRepository = GetOccupationRepository();
            var occupationCompetencyRepository = GetOccupationCompetencyRepository();
            var occupationStageRepository = GetOccupationStageRepository();
            var proficiencyMapRepository = GetProficiencyMapRepository();
            occupations.stages = new Dictionary<string, string>();
            foreach (var occupationId in occupations.occupationIds)
            {
                var stage = Evaluator.getStage(
                    badges,
                    proficiencies,
                    proficiencyMapRepository.Get(occupationId),
                    occupationRepository.Get(occupationId),
                    occupationCompetencyRepository.GetForOccupation(occupationId),
                    occupationStageRepository.GetForOccupation(occupationId)
                );

                occupations.stages.Add(occupationId, stage);
            }
        }

        // GET api/<controller>
        [HttpGet]
        [ScopeAuthorize("list:entityoccupation")]
        public IHttpActionResult Get()
        {
            try
            {
                //occupations
                var userOccupations = GetRepository().Get();

                //stages
                var badges = GetEntityCompetencyRepository().Get();
                var proficiencies = GetProficiencyRepository().Get();
                var occupations = GetOccupationRepository().Get();
                var competencies = GetOccupationCompetencyRepository().Get();
                var occupationStages = GetOccupationStageRepository().Get();
                var proficiencyMaps = GetProficiencyMapRepository().Get();
                foreach (var user in userOccupations)
                {
                    user.Value.stages = new Dictionary<string, string>();
                    foreach (var id in user.Value.occupationIds)
                    {
                        var stage = Evaluator.getStage(
                            badges[user.Key], 
                            proficiencies, 
                            proficiencyMaps[id], 
                            occupations.FirstOrDefault(o => o.id == id), 
                            competencies[id],
                            occupationStages[id]
                        );

                        user.Value.stages.Add(id, stage);
                    }
                }

                log.InfoFormat("GET entity occupations: {0} occupations", userOccupations.Count());
                return Ok(userOccupations);
            }
            catch (Exception ex)
            {
                log.Error($"GET entity occupations failed", ex);
                return InternalServerError();
            }
        }

        // GET api/<controller>
        [HttpGet]
        [ScopeAuthorize("list:entityoccupation")]
        public IHttpActionResult Get(string id) 
        {
            try
            {
                //occupations
                var occupations = GetRepository().Get(id);

                populateStages(id, occupations);

                log.InfoFormat("GET occupations for entity {1}: {0} occupations", occupations.occupationIds.Count(), id);
                return Ok(occupations);
            }
            catch (Exception ex)
            {
                log.Error($"GET occupations for entity {id} failed", ex);
                return InternalServerError();
            }
        }

        // POST api/<controller>
        [HttpPut]
        [ScopeAuthorize("update:entityoccupation")]
        public IHttpActionResult Put(string id, [FromBody] EntityOccupations data)
        {
            try
            {
                var result = GetRepository().Update(id, data);
                populateStages(id, result);
                log.InfoFormat("PUT occupations for entity {0} suceeded", id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                log.Error(string.Format("PUT occupations for entity {0} failed", id), ex);
                return InternalServerError();
            }
        }
    }
}