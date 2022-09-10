using badges_api.Models;
using Amazon.DynamoDBv2.DocumentModel;

namespace badges_api.Mappers
{
    public class CompensationTierStepMapper: Mapper
    {
        private const string compensation = "compensation";

        public static CompensationTierStep ToObject(Document document)
        {
            return new CompensationTierStep
            {
                compensation = document[compensation].AsDecimal(),
                compensationStepId = document[CompensationStepMapper.compensationStepId].AsString(),
                compensationTierId = document[CompensationTierMapper.compensationTierId].AsString()
            };
        }

        public static void SetData(decimal value, Document target)
        {
            target[compensation] = value;
        }
    }
}