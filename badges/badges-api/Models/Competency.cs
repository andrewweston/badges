using Newtonsoft.Json;
using System.Collections.Generic;
using System.Runtime.Serialization;

namespace badges_api.Models
{
    [DataContract]
    public class Competency
    {
        [DataMember]
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string id { get; set; }
        [DataMember]
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string name { get; set; }
        [DataMember]
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string description { get; set; }
        [DataMember]
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public IEnumerable<Behaviour> behaviours { get; set; }
        [DataMember]
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public IEnumerable<string> tags { get; set; }
    }
}