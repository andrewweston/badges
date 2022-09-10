using Amazon.DynamoDBv2.DocumentModel;
using badges_api.Models;

namespace badges_api.Mappers
{
    public class OccupationMapper: Mapper
    {
        private const string name = "name";
        private const string description = "description";
        private const string optionsCount = "optionsCount";

        /// <summary>
        /// Foreign Key to reference occupation
        /// </summary>
        public const string occupationId = "occupationId";
        
        public static Occupation ToObject(Document document)
        {
            return new Occupation
            {
                id = document[id].AsString(),
                name = document[name].AsString(),
                description = !document.ContainsKey(description) ? "" : document[description].AsString(),
                optionsCount = document[optionsCount].AsInt()
            };
        }

        public static void SetData(Occupation value, Document target)
        {
            target[name] = value.name;
            target[description] = value.description ?? "";
            target[optionsCount] = value.optionsCount;
        }
    }
}