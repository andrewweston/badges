using badges_api.Mappers;
using badges_api.Models;
using System.Collections.Generic;
using System.Linq;

namespace badges_api.Repository
{
    public class OccupationCompetencyRepository : Repository
    {
        public const string TYPE = "OCCUPATION_COMPETENCY";

        public ILookup<string, OccupationCompetency> Get()
        {
            return base.Get(TYPE).ToLookup(b => b[OccupationMapper.occupationId].AsString(), b => OccupationCompetencyMapper.ToObject(b));
        }

        public IEnumerable<OccupationCompetency> GetForOccupation(string occupationId)
        {
            return getReferencedItemsOfType(TYPE, OccupationMapper.occupationId, occupationId)
                .Select(b => OccupationCompetencyMapper.ToObject(b))
                .ToList();
        }

        public IEnumerable<OccupationCompetency> Update(string occupationId, IEnumerable<OccupationCompetency> competencies)
        {
            var old_competencies = getReferencedItemsOfType(TYPE, OccupationMapper.occupationId, occupationId);

            var competencyIds = competencies.Select(a => a.competencyId).ToList();

            //identify items to be deleted
            var to_be_deleted = competencies == null
                ? old_competencies.ToList()
                : old_competencies.Where(c => !competencyIds.Contains(c[CompetencyMapper.competencyId].AsString())).ToList();
            to_be_deleted.ForEach(c => _client.DeleteItem(c));

            //identfy items to be added
            if (competencyIds.Count > 0)
            {
                var added = competencies
                    .Where(b => old_competencies.Count(x => x[CompetencyMapper.competencyId].AsString() == b.competencyId) == 0).ToList();
                added.ForEach(r =>
                {
                    var d = NewRecord(TYPE);
                    d[OccupationMapper.occupationId] = occupationId;
                    d[CompetencyMapper.competencyId] = r.competencyId;
                    OccupationCompetencyMapper.SetData(r, d);
                    _client.PutItem(d);
                });
            }

            //identify items changed
            var updated = old_competencies
                .Where(c => competencyIds.Contains(c[CompetencyMapper.competencyId].AsString()))
                .Select(c => new { record = c, data = competencies.SingleOrDefault(x => x.competencyId == c[CompetencyMapper.competencyId].AsString()) })
                .Where(c => c.record[OccupationCompetencyMapper.category].AsString() != c.data.category.ToString() || c.record[OccupationCompetencyMapper.factor].AsInt() != c.data.factor)
                .ToList();
            updated.ForEach(c =>
            {
                OccupationCompetencyMapper.SetData(c.data, c.record);
                _client.UpdateItem(c.record);
            });


            return getReferencedItemsOfType(TYPE, OccupationMapper.occupationId, occupationId)
                .Select(b => OccupationCompetencyMapper.ToObject(b))
                .ToList();
        }

        public override void Delete(string id)
        {
            var doc = base.Get(TYPE, id);
            _client.DeleteItem(doc);
        }
    }
}