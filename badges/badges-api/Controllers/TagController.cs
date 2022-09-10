using badges_api.Helpers;
using badges_api.Models;
using System;
using System.Linq;
using System.Web.Http;
using log4net;
using badges_api.Repository;

namespace badges_api.Controllers
{
    public class TagController : ApiController
    {
        private static readonly ILog log = LogManager.GetLogger(typeof(WebApiApplication));

        private TagRepository GetRepository()
        {
            return new TagRepository();
        }
        
        // GET api/<controller>
        [HttpGet]
        [ScopeAuthorize("list:competency")]
        public IHttpActionResult Get() 
        {
            try
            {
                var tags = GetRepository().Get();

                log.InfoFormat("GET Tags: {0} tags", tags.Count());
                return Ok(tags);
            }
            catch (Exception ex)
            {
                log.Error("GET Tags failed", ex);
                return InternalServerError();
            }
        }
    }
}