using badges_api.Helpers;
using badges_api.Models;
using System;
using System.Linq;
using log4net;
using badges_api.Repository;
using System.Web.Http;

namespace badges_api.Controllers
{
    public class CompensationTierController : ApiController
    {
        private static readonly ILog log = LogManager.GetLogger(typeof(WebApiApplication));
        
        private CompensationTierRepository GetCompensationTierRepository()
        {
            return new CompensationTierRepository();
        }

        private CompensationTierStepRepository GetCompesationTierStepRepository()
        {
            return new CompensationTierStepRepository();
        }

        // GET api/<controller>
        [HttpGet]
        [ScopeAuthorize("list:compensation")]
        public IHttpActionResult Get() //  IEnumerable<TiersModel>
        {
            try
            {
                var compensationTiers = GetCompensationTierRepository().Get();

                //TODO: only Admin should be able to retrieve compensations
                var compensations = GetCompesationTierStepRepository().Get();

                compensationTiers.ToList().ForEach(t =>
                {
                    t.compensations = compensations.Where(c => c.compensationTierId == t.id).ToDictionary(c => c.compensationStepId, c => c.compensation);
                });

                log.InfoFormat("GET Compensation Tiers: {0} tiers", compensationTiers.Count());
                return Ok(compensationTiers);
            }
            catch (Exception ex)
            {
                log.Error("GET Compensation Tiers failed", ex);
                return InternalServerError();
            }
        }

        // PUT api/<controller>
        [HttpPut]
        [ScopeAuthorize("update:compensation")]
        public IHttpActionResult Put(string id, [FromBody] CompensationTier compesantionTier)
        {
            try
            {
                compesantionTier.id = id;
                //update tier
                var result = GetCompensationTierRepository().Update(compesantionTier);

                var old_compensationTier = GetCompensationTierRepository().Get();

                //update comepansations
                var compensationRepository = GetCompesationTierStepRepository();
                result.compensations = compensationRepository.Update(id, compesantionTier.compensations).ToDictionary(r => r.compensationStepId, r => r.compensation);

                log.InfoFormat("PUT Compensation Tier#{0} suceeded", id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                log.Error(string.Format("PUT Compensation Tier#{0} failed", id), ex);
                return InternalServerError(new ApplicationException("Failed to update the compensation tier. It might have been deleted. Please refresh your browser"));
            }
        }

        // POST api/<controller>
        [HttpPost]
        [ScopeAuthorize("create:compensation")]
        public IHttpActionResult Post([FromBody] CompensationTier compensationTier)
        {
            try
            {
                var result = GetCompensationTierRepository().Create(compensationTier);

                //create compensations
                var compensationRepository = GetCompesationTierStepRepository();
                result.compensations = compensationRepository.Update(result.id, compensationTier.compensations).ToDictionary(r => r.compensationStepId, r => r.compensation);

                log.InfoFormat("POST Compensation Tier {0} suceeded", compensationTier.name);
                return Ok(result);
            }
            catch (Exception ex)
            {
                log.Error(string.Format("POST Compensation Tier {0} failed", compensationTier.name), ex);
                return InternalServerError();
            }
        }

        // POST api/<controller>
        [HttpDelete]
        [ScopeAuthorize("delete:compensation")]
        public IHttpActionResult Delete([FromBody] CompensationTier compensationTier)
        {
            try
            {
                GetCompensationTierRepository().Delete(compensationTier.id);
                log.InfoFormat("DELETE Compensation Tier {0} suceeded", compensationTier.id);
                return Ok();
            }
            catch (ApplicationException ex)
            {
                log.Error(string.Format("DELETE Compensation Tier {0} failed", compensationTier.id), ex);
                return InternalServerError(ex);
            }
            catch (Exception ex)
            {
                log.Error(string.Format("DELETE Compensation Tier {0} failed", compensationTier.id), ex);
                return InternalServerError();
            }
        }
    }
}