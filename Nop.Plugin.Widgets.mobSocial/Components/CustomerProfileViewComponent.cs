﻿using Microsoft.AspNetCore.Mvc;

namespace Nop.Plugin.Widgets.MobSocial.Components
{
    [ViewComponent(Name = ViewName)]
    public class CustomerProfileViewComponent : MobSocialViewComponent
    {
        public const string ViewName = "MobSocialCustomerProfile";
        /// <summary>
        /// Invoke view component
        /// </summary>
        /// <param name="widgetZone">Widget zone name</param>
        /// <param name="additionalData">Additional data</param>
        /// <returns>View component result</returns>
        public IViewComponentResult Invoke(string widgetZone, object additionalData)
        {
            return View("mobSocial/AboutMe/PublicInfo");
        }
    }
}