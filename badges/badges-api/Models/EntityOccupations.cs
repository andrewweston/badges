using Newtonsoft.Json;
using System.Collections.Generic;
using System.Runtime.Serialization;

namespace badges_api.Models
{
    [DataContract]
    public class EntityOccupations
    {
        [DataMember]
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public IEnumerable<string> occupationIds { get; set; }
        [DataMember]
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public Dictionary<string, string> stages { get; set; }
    }
}