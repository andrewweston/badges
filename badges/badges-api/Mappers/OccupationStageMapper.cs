using badges_api.Models;
using Amazon.DynamoDBv2.DocumentModel;

namespace badges_api.Mappers
{
    public class OccupationStageMapper: Mapper
    {
        public const string factor = "factor";
        public const string name = "name";
        /// <summary>
        /// Foreign Key to reference stage
        /// </summary>
        public const string occupationStageId = "occupationStageId";

        public static OccupationStage ToObject(Document document)
        {
            var occupationStage = new OccupationStage
            {
                id = document[id].AsString(),
                compensationTierId = document[CompensationTierMapper.compensationTierId].AsString(),
                name = document[name].AsString(),
                factor = document[factor].AsInt()
            };
            return occupationStage;
        }

        public static void SetData(OccupationStage source, Document target, int newFactor)
        {
            target[CompensationTierMapper.compensationTierId] = source.compensationTierId;
            target[factor] = newFactor;
            target[name] = source.name;
        }
    }
}