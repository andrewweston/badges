using Newtonsoft.Json;
using System.Runtime.Serialization;

namespace badges_api.Models
{
    [DataContract]
    public class Tag
    {
        [DataMember]
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string id { get; set; }
        [DataMember]
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string name { get; set; }
    }
}