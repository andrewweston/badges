using badges_api.Mappers;
using badges_api.Models;
using System.Collections.Generic;
using System.Linq;

namespace badges_api.Repository
{
    public class EntityOccupationRepository : Repository
    {
        public const string TYPE = "ENTITY_OCCUPATION";

        public IDictionary<string, EntityOccupations> Get()
        {
            return base.Get(TYPE).GroupBy(o => o[EntityMapper.entityId].ToString()).ToDictionary(
                g => g.Key,
                g => new EntityOccupations {
                    occupationIds = g.Select(b => b[OccupationMapper.occupationId].ToString()).ToList()
                }
            );
        }

        public new EntityOccupations Get(string entityId)
        {
            return new EntityOccupations
            {
                occupationIds = getReferencedItemsOfType(TYPE, EntityMapper.entityId, entityId)
                    .Select(b => b[OccupationMapper.occupationId].ToString())
                    .ToList()
            };
        }

        public EntityOccupations Update(string entityId, EntityOccupations occupations)
        {
            var old_occupations = getReferencedItemsOfType(TYPE, EntityMapper.entityId, entityId);

            //identify items to be deleted
            var to_be_deleted = occupations == null
                ? old_occupations.ToList()
                : old_occupations.Where(c => !occupations.occupationIds.Contains(c[OccupationMapper.occupationId].AsString())).ToList();
            to_be_deleted.ForEach(c => _client.DeleteItem(c));

            //identfy items to be added
            if (occupations != null && occupations.occupationIds.Count() > 0)
            {
                var added = occupations.occupationIds
                    .Where(b => old_occupations.Count(x => x[OccupationMapper.occupationId].AsString() == b) == 0).ToList();
                added.ForEach(r =>
                {
                    var d = NewRecord(TYPE, string.Format("{0}-{1}",entityId, r));
                    d[EntityMapper.entityId] = entityId;
                    d[OccupationMapper.occupationId] = r;
                    //EntityOccupationMapper.SetData(r, d);
                    _client.PutItem(d);
                });
            }

            return Get(entityId);
        }

        public override void Delete(string id)
        {
            var doc = base.Get(TYPE, id);
            _client.DeleteItem(doc);
        }
    }
}