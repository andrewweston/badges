using badges_api.Models;
using Amazon.DynamoDBv2.DocumentModel;

namespace badges_api.Mappers
{
    public class ProficiencyMapper: Mapper
    {
        private const string factor = "factor";
        private const string name = "name";
        private const string description = "description";
        private const string behaviourObservation = "behaviourObservation";

        /// <summary>
        /// Foreign Key to reference proficiency
        /// </summary>
        public const string proficiencyId = "proficiencyId";

        public static Proficiency ToObject(Document document)
        {
            return new Proficiency
            {
                id = document[id].AsString(),
                factor = document[factor].AsInt(),
                name = document[name].AsString(),
                description = !document.ContainsKey(description) ? "" : document[description].AsString(),
                behaviourObservation = !document.ContainsKey(behaviourObservation) ? "" : document[behaviourObservation].AsString()
            };
        }

        public static void SetData(Proficiency source, Document target)
        {
            target[factor] = source.factor;
            target[name] = source.name;
            target[description] = source.description ?? "";
            target[behaviourObservation] = source.behaviourObservation ?? "";
        }
    }
}