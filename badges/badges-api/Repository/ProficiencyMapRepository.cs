using badges_api.Mappers;
using badges_api.Models;
using System.Collections.Generic;
using System.Linq;

namespace badges_api.Repository
{
    public class ProficiencyMapRepository: Repository
    {
        public const string TYPE = "PROFICIENCY_MAP";
        
        private void SetId(string occupationId, ProficiencyMap proficiencyMap)
        {
            //so that we never have two records with the same proficiency and competency
            proficiencyMap.id = $"{occupationId}-{proficiencyMap.occupationStageId}-{proficiencyMap.competencyId}";
        }

        public ILookup<string, ProficiencyMap> Get()
        {
            return base.Get(TYPE).ToLookup(r => r[OccupationMapper.occupationId].AsString(), r => ProficiencyMapMapper.ToObject(r));
        }

        public IEnumerable<ProficiencyMap> Get(string occupationId)
        {
            return base.getReferencedItemsOfType(TYPE, OccupationMapper.occupationId, occupationId).Select(r => ProficiencyMapMapper.ToObject(r)).ToList();
        }

        public IEnumerable<ProficiencyMap> Update(string occupationId, IEnumerable<ProficiencyMap> proficiencyMap)
        {
            if (proficiencyMap == null)
            {
                proficiencyMap = new List<ProficiencyMap>();
            }

            //set correct ids for all recieved items
            proficiencyMap.ToList().ForEach(i => SetId(occupationId, i));

            var oldMap = base.getReferencedItemsOfType(TYPE, OccupationMapper.occupationId, occupationId);
            var oldIds = oldMap.Select(i => i[Mapper.id].AsString()).ToList();
            var newIds = proficiencyMap.Select(i => i.id).ToList();
            var deleted = oldMap.Where(i => !newIds.Contains(i[Mapper.id].AsString())).ToList();
            var added = proficiencyMap.Where(i => !oldIds.Contains(i.id)).ToList();
            var updated = oldMap.Except(deleted)
                .Join(proficiencyMap.Except(added), o => o[Mapper.id].AsString(), n => n.id, (o, n) => new { record = o, data = n })
                .Where(i => i.record[ProficiencyMapper.proficiencyId].AsString() != i.data.proficiencyId)
                .ToList();

            foreach(var i in deleted)
            {
                _client.DeleteItem(i);
            }
            foreach(var i in added)
            {
                var doc = NewRecord(TYPE, i.id);
                doc[OccupationMapper.occupationId] = occupationId;
                doc[OccupationStageMapper.occupationStageId] = i.occupationStageId;
                doc[CompetencyMapper.competencyId] = i.competencyId;
                ProficiencyMapMapper.SetData(i, doc);
                _client.PutItem(doc);
            }
            foreach(var i in updated)
            {
                ProficiencyMapMapper.SetData(i.data, i.record);
                _client.UpdateItem(i.record);
            }
            
            return Get(occupationId);
        }

        public override void Delete(string id)
        {
            var doc = base.Get(TYPE, id);
            _client.DeleteItem(doc);
        }
    }
}