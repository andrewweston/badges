using badges_api.Helpers;
using badges_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using log4net;
using badges_api.Repository;
using System.Configuration;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace badges_api.Controllers
{
    public class EntityController : ApiController
    {
        private static readonly ILog log = LogManager.GetLogger(typeof(WebApiApplication));

        private static readonly WebClient bambooHR;

        private EntityRepository GetRepository()
        {
            return new EntityRepository();
        }

        static EntityController()
        {
            bambooHR = new WebClient();
            bambooHR.Headers.Add(HttpRequestHeader.Authorization, "Basic " + ConfigurationManager.AppSettings["BambooHRKey"]);
        }

        private static async Task<Dictionary<string, string>> getBambooData()
        {
            bambooHR.Headers.Add(HttpRequestHeader.Accept, "application/json");
            var json = await bambooHR.DownloadStringTaskAsync(ConfigurationManager.AppSettings["BambooHR"]);
            var data = (JObject)JsonConvert.DeserializeObject(json);
            return data.GetValue("employees").ToLookup(
                r => ((JObject)r).GetValue("workEmail").ToString(),
                r => ((JObject)r).GetValue("displayName").ToString()
            ).Where(e => !string.IsNullOrEmpty(e.Key) && e.Count() == 1)
            .ToDictionary(e => e.Key, e => e.Single());
        }

        // GET api/<controller>
        [HttpGet]
        [ScopeAuthorize("list:entity")]
        public async Task<IHttpActionResult> Get()
        {
            try
            {
                var persons = await getBambooData();
                var entities = GetRepository().Get();

                var mergedList = persons.Select(s => new Entity
                {
                    id = IdentityHelper.GetId(s.Key),
                    email = s.Key,
                    name = s.Value,
                    isManual = false
                }).ToList();

                //Bamboo is source of truth, if a person is both manual and in Bamboo we get the Bamboo version only
                mergedList.AddRange(entities.Where(e => !mergedList.Exists(p => p.id == e.id)));

                log.InfoFormat("GET entity: {0} entities", mergedList.Count());

                return Ok(mergedList);
            }
            catch (Exception ex)
            {
                log.Error("GET entity failed", ex);
                return InternalServerError();
            }
        }

        // PUT api/<controller>
        [HttpPut]
        [ScopeAuthorize("update:entity")]
        public IHttpActionResult Put(string id, [FromBody] Entity entity)
        {
            try
            {
                entity.id = id;
                var result = GetRepository().Update(entity);
                log.InfoFormat("PUT Entity#{0} suceeded", id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                log.Error(string.Format("PUT Entity#{0} failed", id), ex);
                return InternalServerError(new ApplicationException("Failed to update the entity. It might have been deleted. Please refresh your browser"));
            }
        }

        // POST api/<controller>
        [HttpPost]
        [ScopeAuthorize("create:entity")]
        public IHttpActionResult Post([FromBody] Entity entity)
        {
            try
            {
                entity.id = IdentityHelper.GetId(entity.email);
                var result = GetRepository().Create(entity);
                log.InfoFormat("POST Entity {0} suceeded", entity.name);
                return Ok(result);
            }
            catch (Exception ex)
            {
                log.Error(string.Format("POST Proficiency {0} failed", entity.name), ex);
                return InternalServerError();
            }
        }

        // POST api/<controller>
        [HttpDelete]
        [ScopeAuthorize("delete:entity")]
        public IHttpActionResult Delete([FromBody] Entity entity)
        {
            try
            {
                GetRepository().Delete(entity.id);
                log.InfoFormat("DELETE Entity {0} suceeded", entity.id);
                return Ok();
            }
            catch (Exception ex)
            {
                log.Error(string.Format("DELETE Entity {0} failed", entity.id), ex);
                return InternalServerError();
            }
        }

    }
}