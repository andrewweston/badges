using badges_api.Mappers;
using badges_api.Models;
using System.Collections.Generic;
using System.Linq;

namespace badges_api.Repository
{
    public class OccupationRepository : Repository
    {
        public const string TYPE = "OCCUPATION";

        public IEnumerable<Occupation> Get()
        {
            return base.Get(TYPE).Select(r => OccupationMapper.ToObject(r)).ToList();
        }

        public new Occupation Get(string id)
        {
            return OccupationMapper.ToObject(this.Get(TYPE, id));
        }

        public Occupation Update(Occupation occupation)
        {
            var doc = base.Get(TYPE, occupation.id);
            OccupationMapper.SetData(occupation, doc);
            _client.UpdateItem(doc);
            return OccupationMapper.ToObject(doc);
        }

        public override void Delete(string id)
        {
            var doc = base.Get(TYPE, id);

            //delete anything that references this occupation
            var dependancies = getReferencedItems(OccupationMapper.occupationId, id);
            dependancies.Distinct().ToList().ForEach(d => Repositories[d[Mapper.type]].First().Delete(d[Mapper.id]));

            _client.DeleteItem(doc);
        }

        public Occupation Create(Occupation occupation)
        {
            var doc = NewRecord(TYPE);
            OccupationMapper.SetData(occupation, doc);
            _client.PutItem(doc);
            return OccupationMapper.ToObject(doc);
        }
    }
}