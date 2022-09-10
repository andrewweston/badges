using Newtonsoft.Json;

namespace badges_api.Models
{
    public class OccupationStage
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string id { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string name { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int factor { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string compensationTierId { get; set; }
    }
}