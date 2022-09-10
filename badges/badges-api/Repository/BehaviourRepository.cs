using badges_api.Mappers;
using badges_api.Models;
using System.Collections.Generic;
using System.Linq;

namespace badges_api.Repository
{
    public class BehaviourRepository: Repository
    {
        public const string TYPE = "BEHAVIOUR";

        public ILookup<string, Behaviour> Get()
        {
            return base.Get(TYPE).ToLookup(r => r[CompetencyMapper.competencyId].AsString(), r => BehaviourMapper.ToObject(r));
        }

        public IEnumerable<Behaviour> GetForCompetency(string competencyId)
        {
            return base.getReferencedItemsOfType(TYPE, CompetencyMapper.competencyId, competencyId).Select(r => BehaviourMapper.ToObject(r)).ToList();
        }

        public IEnumerable<Behaviour> Update(string competencyId, IEnumerable<Behaviour> behaviours)
        {
            if (behaviours == null)
            {
                behaviours = new List<Behaviour>();
            }

            behaviours = behaviours
                .Select((b, i) => new Behaviour { id = b.id, factor = i, description = b.description })
                .ToList();
            var oldMap = base.getReferencedItemsOfType(TYPE, CompetencyMapper.competencyId, competencyId);
            var oldIds = oldMap.Select(i => i[Mapper.id].AsString()).ToList();
            var newIds = behaviours.Select(i => i.id).ToList();
            var deleted = oldMap.Where(i => !newIds.Contains(i[Mapper.id].AsString())).ToList();
            var added = behaviours.Where(i => !oldIds.Contains(i.id)).ToList();
            var updated = oldMap.Except(deleted)
                .Join(behaviours.Except(added), o => o[Mapper.id].AsString(), n => n.id, (o, n) => new { record = o, data = n })
                .Where(i => i.record[BehaviourMapper.description].AsString() != i.data.description || i.record[BehaviourMapper.factor].AsInt() != i.data.factor)
                .ToList();

            foreach (var i in deleted)
            {
                _client.DeleteItem(i);
            }
            foreach (var i in added)
            {
                var doc = NewRecord(TYPE);
                doc[CompetencyMapper.competencyId] = competencyId;
                BehaviourMapper.SetData(i, doc);
                _client.PutItem(doc);
            }
            foreach (var i in updated)
            {
                BehaviourMapper.SetData(i.data, i.record);
                _client.UpdateItem(i.record);
            }

            return GetForCompetency(competencyId);
        }

        public override void Delete(string id)
        {
            var doc = base.Get(TYPE, id);

            //delete the behaviour
            _client.DeleteItem(doc);
        }
    }
}