﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Nop.Web.Framework.Mvc;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class PageDisplayModel : BaseNopModel
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public int Id { get; set; }
    }
}
