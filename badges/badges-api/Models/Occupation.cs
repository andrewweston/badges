using Newtonsoft.Json;
using System.Collections.Generic;

namespace badges_api.Models
{
    public class Occupation
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string id { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string name { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string description { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public IEnumerable<OccupationCompetency> competencies { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int optionsCount { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public IEnumerable<OccupationStage> stages { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public IEnumerable<ProficiencyMap> proficiencyMap { get; set; }
    }
}