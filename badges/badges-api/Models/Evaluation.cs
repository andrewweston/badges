using Newtonsoft.Json;
using System.Collections.Generic;
using System.Runtime.Serialization;

namespace badges_api.Models
{
    [DataContract]
    public class Evaluation
    {
        [DataMember]
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public IEnumerable<Badge> data { get; set; }
    }
}