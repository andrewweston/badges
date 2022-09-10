using badges_api.Mappers;
using badges_api.Models;
using System.Collections.Generic;
using System.Linq;

namespace badges_api.Repository
{
    public class EntityCompetencyRepository : Repository
    {
        public const string TYPE = "ENTITY_COMPETENCY";

        public ILookup<string,Badge> Get()
        {
            return base.Get(TYPE)
                .ToLookup(b => b[EntityMapper.entityId].AsString(), b => EntityCompetencyMapper.ToObject(b));
        }

        public new IEnumerable<Badge> Get(string entityId)
        {
            return getReferencedItemsOfType(TYPE, EntityMapper.entityId, entityId)
                .Select(b => EntityCompetencyMapper.ToObject(b))
                .ToList();
        }

        public void Update(string entityId, IEnumerable<Badge> evaluation)
        {
            var old_badges = getReferencedItemsOfType(TYPE, EntityMapper.entityId, entityId);

            foreach (var item in evaluation)
            {
                var old_badge = old_badges.SingleOrDefault(x => x[CompetencyMapper.competencyId] == item.competencyId);
                if (old_badge == null)
                {
                    var d = NewRecord(TYPE, string.Format("{0}-{1}", entityId, item.competencyId));
                    d[EntityMapper.entityId] = entityId;
                    d[CompetencyMapper.competencyId] = item.competencyId;
                    EntityCompetencyMapper.SetData(item, d);
                    _client.PutItem(d);
                }
                else
                {
                    EntityCompetencyMapper.SetData(item, old_badge);
                    _client.UpdateItem(old_badge);
                }
            }
        }

        public override void Delete(string id)
        {
            var doc = base.Get(TYPE, id);
            _client.DeleteItem(doc);
        }
    }
}