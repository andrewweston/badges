using Newtonsoft.Json;
using System.Collections.Generic;

namespace badges_api.Models
{
    //[DataContract]
    public class CompensationTier
    {
        //[DataMember]
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int factor { get; set; }
        //[DataMember]
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string id { get; set; }
        //[DataMember]
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string name { get; set; }
        //[DataMember]
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public IDictionary<string, decimal> compensations { get; set; }
    }
}