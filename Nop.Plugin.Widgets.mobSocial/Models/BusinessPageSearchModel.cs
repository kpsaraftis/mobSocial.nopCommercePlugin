﻿using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;
using Nop.Web.Framework.Mvc.ModelBinding;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class BusinessPageSearchModel
    {
        public BusinessPageSearchModel()
        {
            AvailableStates = new List<SelectListItem>();
            AvailableCountries = new List<SelectListItem>();
        }

        public bool StateProvinceEnabled { get; set; }
        [NopResourceDisplayName("Address.Fields.Country")]
        public int CountryId { get; set; }
        [NopResourceDisplayName("Address.Fields.StateProvince")]
        public int StateProvinceId { get; set; }

        public IList<SelectListItem> AvailableStates { get; set; }
        public IList<SelectListItem> AvailableCountries { get; set; }
    }
}

