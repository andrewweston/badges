using badges_api.Mappers;
using badges_api.Models;
using System.Collections.Generic;
using System.Linq;

namespace badges_api.Repository
{
    public class CompetencyTagRepository : Repository
    {
        public const string TYPE = "COMPETENCY_TAG";

        public ILookup<string, string> Get()
        {
            return base.Get(TYPE).ToLookup(
                o => o[CompetencyMapper.competencyId].AsString(),
                o => o[TagMapper.tagId].AsString()
            );
        }

        public IEnumerable<string> GetForCompetency(string competencyId)
        {
            return getReferencedItemsOfType(TYPE, CompetencyMapper.competencyId, competencyId)
                .Select(o => o[TagMapper.tagId].AsString())
                .ToList();
        }

        public IEnumerable<string> Update(string competencyId, IEnumerable<string> tagIds)
        {
            var old_tags = getReferencedItemsOfType(TYPE, CompetencyMapper.competencyId, competencyId);

            //identify items to be deleted
            var to_be_deleted = tagIds == null
                ? old_tags.ToList()
                : old_tags.Where(c => !tagIds.Contains(c[TagMapper.tagId].AsString())).ToList();
            to_be_deleted.ForEach(c => _client.DeleteItem(c));

            //identify items to be added
            if (tagIds != null && tagIds.Count() > 0)
            {
                var added = tagIds.Where(b => old_tags.Count(x => x[TagMapper.tagId].AsString() == b) == 0).ToList();
                added.ForEach(r =>
                {
                    var d = NewRecord(TYPE, string.Format("{0}-{1}",competencyId, r));
                    d[CompetencyMapper.competencyId] = competencyId;
                    d[TagMapper.tagId] = r;
                    _client.PutItem(d);
                });
            }

            return GetForCompetency(competencyId);
        }

        public override void Delete(string id)
        {
            var doc = base.Get(TYPE, id);
            _client.DeleteItem(doc);
        }
    }
}