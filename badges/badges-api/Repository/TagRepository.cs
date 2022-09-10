using badges_api.Mappers;
using badges_api.Models;
using System.Collections.Generic;
using System.Linq;

namespace badges_api.Repository
{
    public class TagRepository: Repository
    {
        public const string TYPE = "TAG";
        
        public IEnumerable<Tag> Get()
        {
            return base.Get(TYPE).Select(r => TagMapper.ToObject(r)).ToList();
        }

        public IEnumerable<Tag> CreateMissing(IEnumerable<string> tags)
        {
            if (tags == null) return new Tag[] { };
            var docs = base.Get(TYPE).ToDictionary(t => t[TagMapper.id].AsString(), t => t);
            var existingRecords = tags.Where(t => docs.ContainsKey(t)).Select(t => docs[t]).ToList();
            var missingKeys = tags.Where(t => !docs.ContainsKey(t)).ToList();
            var lookup = docs.ToLookup(t => t.Value[TagMapper.name].AsString());
            existingRecords = existingRecords.Union(missingKeys.Where(t => lookup.Contains(t)).Select(t => lookup[t].First().Value)).ToList();
            var missingNames = missingKeys.Where(t => !lookup.Contains(t)).ToList();
            foreach (var tag in missingNames)
            {
                var doc = NewRecord(TYPE);
                TagMapper.SetData(new Tag { name = tag }, doc);
                _client.PutItem(doc);
                existingRecords.Add(doc);
            }
            return existingRecords.Select(t => TagMapper.ToObject(t)).ToList();
        }

        public override void Delete(string id)
        {
            var doc = base.Get(TYPE, id);
            
            //delete anything that references this tag
            var dependancies = getReferencedItems(TagMapper.tagId, id);
            dependancies.ToList().ForEach(d => Repositories[d[Mapper.type]].First().Delete(d[Mapper.id]));

            _client.DeleteItem(doc);
        }

    }
}