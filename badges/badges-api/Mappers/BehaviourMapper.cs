using badges_api.Models;
using Amazon.DynamoDBv2.DocumentModel;

namespace badges_api.Mappers
{
    public class BehaviourMapper: Mapper
    {
        public const string factor = "factor";
        public const string description = "description";

        public static Behaviour ToObject(Document document)
        {
            var behaviour = new Behaviour
            {
                id = document[id].AsString(),
                factor = (document[factor]).AsInt(),
                description = document[description].AsString(),
            };
            return behaviour;
        }

        public static void SetData(Behaviour source, Document target)
        {
            target[factor] = source.factor;
            target[description] = source.description;
        }
    }
}