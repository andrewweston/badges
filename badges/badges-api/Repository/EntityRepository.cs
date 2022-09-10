using badges_api.Mappers;
using badges_api.Models;
using System.Collections.Generic;
using System.Linq;

namespace badges_api.Repository
{
    public class EntityRepository: Repository
    {
        public const string TYPE = "ENTITY";
        
        public IEnumerable<Entity> Get()
        {
            return base.Get(TYPE).Select(r => EntityMapper.ToObject(r)).ToList();
        }

        public Entity Update(Entity entity)
        {
            var doc = base.Get(TYPE, entity.id);
            EntityMapper.SetData(entity, doc);
            _client.UpdateItem(doc);
            return EntityMapper.ToObject(doc);
        }

        public override void Delete(string id)
        {
            var doc = base.Get(TYPE, id);
            
            //delete anything that references this entity
            var dependencies = getReferencedItems(EntityMapper.entityId, id);
            dependencies.ToList().ForEach(d => Repositories[d[Mapper.type]].First().Delete(d[Mapper.id]));

            _client.DeleteItem(doc);
        }

        public Entity Create(Entity entity)
        {
            var doc = NewRecord(TYPE, entity.id);
            EntityMapper.SetData(entity, doc);
            _client.PutItem(doc);
            return EntityMapper.ToObject(doc);
        }

    }
}