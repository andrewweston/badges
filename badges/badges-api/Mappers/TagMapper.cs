using badges_api.Models;
using Amazon.DynamoDBv2.DocumentModel;

namespace badges_api.Mappers
{
    public class TagMapper: Mapper
    {
        public const string name = "name";

        /// <summary>
        /// Foreign Key to reference tag
        /// </summary>
        public const string tagId = "tagId";

        public static Tag ToObject(Document document)
        {
            return new Tag
            {
                id = document[id].AsString(),
                name = document[name].AsString()
            };
        }

        public static void SetData(Tag source, Document target)
        {
             target[name] = source.name;
        }
    }
}