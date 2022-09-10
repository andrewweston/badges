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
    public class MyOccupationController : ApiController
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

        private void populateStages(EntityOccupations occupations)
        {
            //stages
            var badges = GetEntityCompetencyRepository().Get(IdentityHelper.GetId(User.Identity));
            var proficiencies = GetProficiencyRepository().Get();
            var occupationRepository = GetOccupationRepository();
            var occupationCompetencyRepository = GetOccupationCompetencyRepository();
            var occupationStageRepository = GetOccupationStageRepository();
            var proficiencyMapRepository = GetProficiencyMapRepository();
            occupations.stages = new Dictionary<string, string>();
            foreach (var id in occupations.occupationIds)
            {
                var stage = Evaluator.getStage(
                    badges,
                    proficiencies,
                    proficiencyMapRepository.Get(id),
                    occupationRepository.Get(id),
                    occupationCompetencyRepository.GetForOccupation(id),
                    occupationStageRepository.GetForOccupation(id)
                );

                occupations.stages.Add(id, stage);
            }
        }

        // GET api/<controller>
        [HttpGet]
        [ScopeAuthorize("list:myoccupation")]
        public IHttpActionResult Get() 
        {
            try
            {
                //occupations
                var occupations = GetRepository().Get(IdentityHelper.GetId(User.Identity));
                populateStages(occupations);

                log.InfoFormat("GET my occupations: {0} occupations", occupations.occupationIds.Count());
                return Ok(occupations);
            }
            catch (Exception ex)
            {
                log.Error("GET my occupations failed", ex);
                return InternalServerError();
            }
        }

        // POST api/<controller>
        [HttpPut]
        [ScopeAuthorize("update:myoccupation")]
        public IHttpActionResult Put([FromBody] EntityOccupations data)
        {
            try
            {
                var result = GetRepository().Update(IdentityHelper.GetId(User.Identity), data);
                populateStages(result);

                log.InfoFormat("PUT my occupations suceeded");
                return Ok(result);
            }
            catch (Exception ex)
            {
                log.Error("PUT my occupations failed", ex);
                return InternalServerError();
            }
        }
    }
}