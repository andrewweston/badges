using Amazon.DynamoDBv2.DocumentModel;
using badges_api.Models;

namespace badges_api.Mappers
{
    public class EntityCompetencyMapper: Mapper
    {        
        public static Badge ToObject(Document document)
        {
            return new Badge
            {
                competencyId = document[CompetencyMapper.competencyId].AsString(),
                proficiencyId = document[ProficiencyMapper.proficiencyId].AsString()
            };
        }

        public static void SetData(Badge source, Document target)
        {
            target[ProficiencyMapper.proficiencyId] = source.proficiencyId;
        }
    }
}