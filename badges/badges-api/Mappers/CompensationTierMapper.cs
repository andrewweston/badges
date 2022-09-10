using badges_api.Models;
using Amazon.DynamoDBv2.DocumentModel;

namespace badges_api.Mappers
{
    public class CompensationTierMapper: Mapper
    {
        private const string factor = "factor";
        private const string name = "name";

        /// <summary>
        /// Foreign Key to reference Proficiency
        /// </summary>
        public const string compensationTierId = "compensationTierId";

        public static CompensationTier ToObject(Document document)
        {
            return new CompensationTier
            {
                id = document[id].AsString(),
                factor = document[factor].AsInt(),
                name = document[name].AsString()
            };
        }

        public static void SetData(CompensationTier value, Document target)
        {
            target[name] = value.name;
            target[factor] = value.factor;
        }
    }
}