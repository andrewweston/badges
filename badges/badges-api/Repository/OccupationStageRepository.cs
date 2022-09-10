using badges_api.Mappers;
using badges_api.Models;
using System.Collections.Generic;
using System.Linq;

namespace badges_api.Repository
{
    public class OccupationStageRepository: Repository
    {
        public const string TYPE = "OCCUPATION_STAGE";


        public ILookup<string, OccupationStage> Get()
        {
            return base.Get(TYPE)
                .OrderBy(b => b[OccupationStageMapper.factor].AsInt())
                .ToLookup(b => b[OccupationMapper.occupationId].AsString(), b => OccupationStageMapper.ToObject(b));
        }

        public IEnumerable<OccupationStage> GetForOccupation(string occupationId)
        {
            return base.getReferencedItemsOfType(TYPE, OccupationMapper.occupationId, occupationId)
                .OrderBy(b => b[OccupationStageMapper.factor].AsInt())
                .Select(r => OccupationStageMapper.ToObject(r))
                .ToList();
        }

        public IEnumerable<OccupationStage> Update(string occupationId, IEnumerable<OccupationStage> stages)
        {
            var old_stages = getReferencedItemsOfType(TYPE, OccupationMapper.occupationId, occupationId);
            
            var new_ids = (stages != null) ? stages.Select(s => s.id).ToList(): null;
            var old_ids = (old_stages != null) ? old_stages.Select(s => s[Mapper.id].AsString()).ToList(): null;

            //identify items to be deleted
            var to_be_deleted = stages == null
                ? old_stages.ToList()
                : old_stages.Where(c => !new_ids.Contains(c[Mapper.id].AsString())).ToList();
            to_be_deleted.ForEach(c => _client.DeleteItem(c));

            if (stages != null)
            {
                //identfy items to be added
                var new_stages = stages.Select((b, i) => new { factor = i, stage = b }).ToList();
                var added = new_stages.Where(b => !old_ids.Contains(b.stage.id)).ToList();
                added.ForEach(r =>
                {
                    var d = NewRecord(TYPE);
                    d[OccupationMapper.occupationId] = occupationId;
                    OccupationStageMapper.SetData(r.stage, d, r.factor);
                    _client.PutItem(d);
                });

                //identify items to be updated
                var updated = new_stages.Except(added)
                    .Join(old_stages.Except(to_be_deleted), n => n.stage.id, o => o[Mapper.id].AsString(), (n, o) => new { doc = o, obj = n.stage, factor = n.factor })
                    .Where(x => x.doc[CompensationTierMapper.compensationTierId].AsString() != x.obj.compensationTierId ||
                                x.doc[OccupationStageMapper.factor].AsInt() != x.factor ||
                                x.doc[OccupationStageMapper.name].AsString() != x.obj.name)
                    .ToList();
                updated.ForEach(x =>
                {
                    OccupationStageMapper.SetData(x.obj, x.doc, x.factor);
                    _client.UpdateItem(x.doc);
                });

            }

            return GetForOccupation(occupationId);
        }

        public override void Delete(string id)
        {
            var doc = base.Get(TYPE, id);

            //delete anything that references this stage
            var dependancies = getReferencedItems(OccupationStageMapper.occupationStageId, id);
            dependancies.ToList().ForEach(d => Repositories[d[Mapper.type]].First().Delete(d[Mapper.id]));

            //delete the stage
            _client.DeleteItem(doc);
        }

    }
}