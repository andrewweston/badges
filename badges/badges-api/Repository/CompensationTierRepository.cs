using badges_api.Mappers;
using badges_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace badges_api.Repository
{
    public class CompensationTierRepository: Repository
    {
        public const string TYPE = "COMPENSATION_TIER";
        
        public IEnumerable<CompensationTier> Get()
        {
            return base.Get(TYPE).Select(r => CompensationTierMapper.ToObject(r)).ToList();
        }

        public CompensationTier Update(CompensationTier compensationTier)
        {
            var doc = base.Get(TYPE, compensationTier.id);
            CompensationTierMapper.SetData(compensationTier, doc);
            _client.UpdateItem(doc);
            return CompensationTierMapper.ToObject(doc);
        }

        public override void Delete(string id)
        {
            var doc = base.Get(TYPE, id);

            //do not delete the tier if there is any linked stage
            var stages = getReferencedItemsOfType(OccupationStageRepository.TYPE, CompensationTierMapper.compensationTierId, id);
            if (stages.Count() > 0)
            {
                throw new ApplicationException("Could not delete compensation tier as there are linked occupation stages");
            }

            //delete anything that references this tier
            var dependancies = getReferencedItems(CompensationTierMapper.compensationTierId, id);
            dependancies.ToList().ForEach(d => Repositories[d[Mapper.type]].First().Delete(d[Mapper.id]));

            _client.DeleteItem(doc);
        }

        public CompensationTier Create(CompensationTier compensationTier)
        {
            var doc = NewRecord(TYPE);
            CompensationTierMapper.SetData(compensationTier, doc);
            _client.PutItem(doc);
            return CompensationTierMapper.ToObject(doc);
        }

    }
}