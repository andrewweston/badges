using Amazon.DynamoDBv2.DocumentModel;
using badges_api.Models;
using System;

namespace badges_api.Mappers
{
    public class OccupationCompetencyMapper: Mapper
    {
        public enum Category
        {
            required,
            preferred,
            desired
        };

        public const string category = "category";
        public const string factor = "factor";

        public static OccupationCompetency ToObject(Document document)
        {
            return new OccupationCompetency
            {
                competencyId = document[CompetencyMapper.competencyId].AsString(),
                category = (Category)Enum.Parse(typeof(Category), document[category].AsString(), true),
                factor = document[factor].AsInt()
            };
        }

        public static void SetData(OccupationCompetency value, Document target)
        {
            target[category] = value.category.ToString();
            target[factor] = value.factor;
        }
    }
}