﻿using Microsoft.AspNetCore.Routing;
using Nop.Web.Framework.Localization;
using Nop.Web.Framework.Mvc.Routing;

namespace Nop.Plugin.Widgets.MobSocial
{
    public partial class GenericRouteProvider : IRouteProvider
    {

        public void RegisterRoutes(IRouteBuilder routes)
        {

            // override the nopCommerce customer profile route 
            /*routes.MapGenericPathRoute("CustomerProfileSlug",
                           "{generic_se_name}",
                           new { controller = "Common", action = "GenericUrl" },
                           new[] { "Nop.Web.Controllers" });
*/

            // for use in views

            routes.MapLocalizedRoute("CustomerProfileUrl",
                           "{SeName}",
                           new { controller = "Profile", action = "Index" },
                           new[] { "Nop.Web.Controllers" });


            // for use in views
            routes.MapLocalizedRoute("EventPageUrl",
                           "{SeName}",
                           new { controller = "EventPage", action = "Index" },
                           new[] { "Nop.Plugin.Widgets.MobSocial.Controllers" });


            // for use in views
            routes.MapLocalizedRoute("BusinessPageUrl",
                           "{SeName}",
                           new { controller = "BusinessPage", action = "Index" },
                           new[] { "Nop.Plugin.Widgets.MobSocial.Controllers" });

            routes.MapLocalizedRoute("ArtistPageUrl",
              "{SeName}",
              new { controller = "ArtistPage", action = "Index" },
              new[] { "Nop.Plugin.Widgets.MobSocial.Controllers" }
              );

            routes.MapLocalizedRoute("SongUrl",
             "{SeName}",
             new { controller = "Song", action = "Index" },
             new[] { "Nop.Plugin.Widgets.MobSocial.Controllers" }
             );

        }

        public int Priority
        {
            get
            {
                return -999999999;
            }
        }
    }
}
