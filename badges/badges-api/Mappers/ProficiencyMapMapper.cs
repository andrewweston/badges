using badges_api.Models;
using Amazon.DynamoDBv2.DocumentModel;

namespace badges_api.Mappers
{
    public class ProficiencyMapMapper: Mapper
    {
        public static ProficiencyMap ToObject(Document document)
        {
            return new ProficiencyMap
            {
                id = document[id].AsString(),
                occupationStageId = document[OccupationStageMapper.occupationStageId],
                competencyId = document[CompetencyMapper.competencyId].AsString(),
                proficiencyId = document[ProficiencyMapper.proficiencyId].AsString()
            };
        }

        public static void SetData(ProficiencyMap source, Document target)
        {
            target[ProficiencyMapper.proficiencyId] = source.proficiencyId;
        }
    }
}