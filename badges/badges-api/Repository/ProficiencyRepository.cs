using badges_api.Mappers;
using badges_api.Models;
using System.Collections.Generic;
using System.Linq;

namespace badges_api.Repository
{
    public class ProficiencyRepository: Repository
    {
        public const string TYPE = "PROFICIENCY";
        
        public IEnumerable<Proficiency> Get()
        {
            return base.Get(TYPE).Select(r => ProficiencyMapper.ToObject(r)).ToList();
        }

        public Proficiency Update(Proficiency proficiency)
        {
            var doc = base.Get(TYPE, proficiency.id);
            ProficiencyMapper.SetData(proficiency, doc);
            _client.UpdateItem(doc);
            return ProficiencyMapper.ToObject(doc);
        }

        public override void Delete(string id)
        {
            var doc = base.Get(TYPE, id);
            
            //delete anything that references this proficiency
            var dependancies = getReferencedItems(ProficiencyMapper.proficiencyId, id);
            dependancies.ToList().ForEach(d => Repositories[d[Mapper.type]].First().Delete(d[Mapper.id]));

            _client.DeleteItem(doc);
        }

        public Proficiency Create(Proficiency proficiency)
        {
            var doc = NewRecord(TYPE);
            ProficiencyMapper.SetData(proficiency, doc);
            _client.PutItem(doc);
            return ProficiencyMapper.ToObject(doc);
        }

    }
}