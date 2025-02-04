﻿using badges_api.Models;
using Amazon.DynamoDBv2.DocumentModel;

namespace badges_api.Mappers
{
    public class CompensationStepMapper: Mapper
    {
        public const string factor = "factor";
        private const string name = "name";
        /// <summary>
        /// Foreign Key to reference Proficiency
        /// </summary>
        public const string compensationStepId = "compensationStepId";

        public static CompensationStep ToObject(Document document)
        {
            return new CompensationStep
            {
                id = document[id].AsString(),
                factor = document[factor].AsInt(),
                name = document[name].AsString()
            };
        }

        public static void SetData(CompensationStep source, Document target)
        {
            target[factor] = source.factor;
            target[name] = source.name;
        }
    }
}