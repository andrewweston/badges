using Newtonsoft.Json;

namespace badges_api.Models
{
    public class OccupationCompetency
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int factor { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string competencyId { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public Mappers.OccupationCompetencyMapper.Category category { get; set; }
    }
}