using badges_api.Mappers;
using badges_api.Models;
using System.Collections.Generic;
using System.Linq;

namespace badges_api.Repository
{
    public class CompetencyRepository: Repository
    {
        public const string TYPE = "COMPETENCY";
        
        public IEnumerable<Competency> Get()
        {
            return base.Get(TYPE).Select(r => CompetencyMapper.ToObject(r)).ToList();
        }

        public Competency Update(Competency competency)
        {
            var doc = base.Get(TYPE, competency.id);
            CompetencyMapper.SetData(competency, doc);
            _client.UpdateItem(doc);
            return CompetencyMapper.ToObject(doc);
        }

        public override void Delete(string id)
        {
            var doc = base.Get(TYPE, id);

            //delete anything that references this competency
            var dependancies = getReferencedItems(CompetencyMapper.competencyId, id);
            dependancies.ToList().ForEach(d => Repositories[d[Mapper.type]].First().Delete(d[Mapper.id]));

            _client.DeleteItem(doc);
        }

        public Competency Create(Competency competency)
        {
            var doc = NewRecord(TYPE);
            CompetencyMapper.SetData(competency, doc);
            _client.PutItem(doc);
            return CompetencyMapper.ToObject(doc);
        }

    }
}