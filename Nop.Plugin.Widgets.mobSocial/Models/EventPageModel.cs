﻿using System.Collections.Generic;
using System.Web.Mvc;
using Nop.Web.Framework;
using Nop.Web.Framework.Mvc;
using System;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class EventPageModel : BaseNopEntityModel
    {
        public string Name { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string ZipPostalCode { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateUpdated { get; set; }


        public string SeName { get; set; }

        public string State { get; set; }

        public string City { get; set; }

        public List<mobSocial.Models.EventPageHotelModel> Hotels { get; set; }

        public List<mobSocial.Models.EventPagePictureModel> Pictures { get; set; }

        public string Country { get; set; }
    }
}