using badges_api.Models;
using Amazon.DynamoDBv2.DocumentModel;

namespace badges_api.Mappers
{
    public class CompetencyMapper: Mapper
    {
        private const string name = "name";
        private const string description = "description";
        /// <summary>
        /// Foreign Key to reference competency
        /// </summary>
        public const string competencyId = "competencyId";

        public static Competency ToObject(Document document)
        {
            return new Competency
            {
                id = document[id].AsString(),
                name = document[name].AsString(),
                description = !document.ContainsKey(description) ? "" : document[description].AsString()
            };
        }

        public static void SetData(Competency source, Document target)
        {
            target[name] = source.name;
            target[description] = source.description ?? "";
        }
    }
}