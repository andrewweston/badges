using badges_api.Mappers;
using badges_api.Models;
using System.Collections.Generic;
using System.Linq;

namespace badges_api.Repository
{
    public class CompensationTierStepRepository : Repository
    {
        public const string TYPE = "COMPENSATION_TIER_STEP";
        
        public IEnumerable<CompensationTierStep> Get()
        {
            return base.Get(TYPE).Select(r => CompensationTierStepMapper.ToObject(r)).ToList();
        }

        public IEnumerable<CompensationTierStep> Update(string tierId, IDictionary<string, decimal> compensations)
        {
            var old_compensations = getReferencedItemsOfType(TYPE, CompensationTierMapper.compensationTierId, tierId);

            //identify items to be deleted
            var to_be_deleted = compensations == null
                ? old_compensations.ToList()
                : old_compensations.Where(c => !compensations.ContainsKey(c[CompensationStepMapper.compensationStepId].AsString())).ToList();
            to_be_deleted.ForEach(r => _client.DeleteItem(r));

            //identfy items to be added
            if (compensations != null)
            {
                var added = compensations.Keys.Except(old_compensations.Select(c => c[CompensationStepMapper.compensationStepId].AsString())).ToList();
                added.ForEach(r =>
                {
                    var d = NewRecord(TYPE);
                    d[CompensationTierMapper.compensationTierId] = tierId;
                    d[CompensationStepMapper.compensationStepId] = r;
                    CompensationTierStepMapper.SetData(compensations[r], d);
                    _client.PutItem(d);
                });
            }

            //identfy items to be updated
            if (compensations != null)
            {
                var updated = compensations.Join(old_compensations, n => n.Key, o => o[CompensationStepMapper.compensationStepId].AsString(), (n,o) => new { record = o, compensation = n.Value }).ToList();
                updated.ForEach(r =>
                {
                    CompensationTierStepMapper.SetData(r.compensation, r.record);
                    _client.UpdateItem(r.record);
                });
            }

            return getReferencedItemsOfType(TYPE, CompensationTierMapper.compensationTierId, tierId).Select(r => CompensationTierStepMapper.ToObject(r)).ToList();
        }

        public override void Delete(string id)
        {
            var doc = base.Get(TYPE, id);
            _client.DeleteItem(doc);
        }

    }
}