using Amazon.DynamoDBv2.DocumentModel;
using badges_api.Models;

namespace badges_api.Mappers
{
    public class EntityMapper : Mapper
    {
        public const string name = "name";
        public const string email = "email";

        /// <summary>
        /// Foreign Key to reference entity
        /// </summary>
        public const string entityId = "entityId";

        public static Entity ToObject(Document document)
        {
            return new Entity
            {
                id = document[id].AsString(),
                name = document[name].AsString(),
                email = document[email].AsString(),
                isManual = true //entities converted from Document are those coming from DB
            };
        }

        public static void SetData(Entity source, Document target)
        {
            target[name] = source.name;
            target[email] = source.email;
        }

    }
}