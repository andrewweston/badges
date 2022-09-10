using Newtonsoft.Json;
using System.Runtime.Serialization;

namespace badges_api.Models
{
    [DataContract]
    public class Behaviour
    {
        [DataMember]
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string id { get; set; }
        [DataMember]
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int factor { get; set; }
        [DataMember]
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string description { get; set; }
    }
}