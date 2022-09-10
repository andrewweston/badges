using log4net;
using log4net.Config;
using System;
using System.Configuration;
using System.Web.Http;

namespace badges_api
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        private static readonly ILog log = LogManager.GetLogger(typeof(WebApiApplication));

        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
            //FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            //RouteConfig.RegisterRoutes(RouteTable.Routes);

            GlobalContext.Properties["log4net:HostName"] = ConfigurationManager.AppSettings["PAPERTRAIL_SYSTEM"];
            GlobalContext.Properties["log4net:Program"] = ConfigurationManager.AppSettings["PAPERTRAIL_PROGRAM_API"];
            //GlobalContext.Properties["log4net:Port"] = ConfigurationManager.AppSettings["PAPERTRAIL_PORT"];
            //GlobalContext.Properties["log4net:Host"] = ConfigurationManager.AppSettings["PAPERTRAIL_HOST"];
            //GlobalContext.Properties["log4net:Level"] = ConfigurationManager.AppSettings["PAPERTRAIL_LEVEL"];
            XmlConfigurator.Configure();

            log.Info("Starting VoC Eligibility API");
        }

        protected void Application_Stop()
        {
            log.Info("Stopping VoC Eligibility API");
        }

        protected void Application_Error(object sender, EventArgs e)
        {
            Exception ex = Server.GetLastError();
            log.Error("Unhandled exception", ex);
        }
    }
}
