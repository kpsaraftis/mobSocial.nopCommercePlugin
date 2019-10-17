﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using HtmlAgilityPack;
using Microsoft.AspNetCore.Mvc;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class ProxyWebController : MobSocialWidgetBaseController
    {
        /// <summary>
        /// Used as a proxy client for fetching url data from another domain. It can be modified to be used for keeping track of spam urls or other audits
        /// </summary>
        /// <param name="url"></param>
        /// <returns></returns>
        [HttpGet]
        public IActionResult FetchUrl(string url)
        {
            //to extract meta data, we use htmlagilitypack from http://htmlagilitypack.codeplex.com/
            var htmlDocument = new HtmlWeb().Load(url);

            string title = "", description = "";
            var listImageUrls = new List<string>();

            //first give preference to open graph tags
            var descNode = htmlDocument.DocumentNode.SelectSingleNode("//meta[@property='og:description']");
            if (descNode != null)
            {
                var desc = descNode.Attributes["content"];
                if (desc != null)
                    description = HttpUtility.HtmlDecode(desc.Value);
            }
            var titleNode = htmlDocument.DocumentNode.SelectSingleNode("//meta[@property='og:title']");
            if (titleNode != null)
            {
                var t = titleNode.Attributes["content"];
                if (t != null)
                    title = HttpUtility.HtmlDecode(t.Value);
            }

            //if og tags didn't exist or didn't have data, let's try with meta tags for description
            if (descNode == null || string.IsNullOrEmpty(description))
            {
                //no og tag
                descNode = htmlDocument.DocumentNode.SelectSingleNode("//meta[@name='description']");
                if (descNode != null)
                {
                    var desc = descNode.Attributes["content"];
                    if (desc != null)
                        description = HttpUtility.HtmlDecode(desc.Value);
                }
            }
            

            //and then for the title
            if (titleNode == null || string.IsNullOrEmpty(title))
            {
                titleNode = htmlDocument.DocumentNode.SelectSingleNode("//title");
                if (titleNode != null)
                {
                    title = HttpUtility.HtmlDecode(titleNode.InnerText);
                }
            }
           

            //the images to show

            //first the og image ofcourse
            var ogImageNode = htmlDocument.DocumentNode.SelectSingleNode("//meta[@property='og:image']");
            var ogImageUrl = string.Empty;
            if (ogImageNode != null)
            {
                var ogImage = ogImageNode.Attributes["content"];
                if (ogImage != null)
                {
                    ogImageUrl = ogImage.Value;
                }

            }
            listImageUrls = htmlDocument.DocumentNode.Descendants("img").Select(x => x.GetAttributeValue("src", null)).Where(s => !string.IsNullOrEmpty(s)).ToList();
            if(!string.IsNullOrEmpty(ogImageUrl))
            //insert og image in the beginning if it's there
                listImageUrls.Insert(0, ogImageUrl);

            var uriParsed = new Uri(url);
            //now it's quite possible that image urls are relative, let's convert them to absolute ones
            for (var index = 0; index < listImageUrls.Count; index++)
            {
                var u = listImageUrls[index];

                //if url starts with a /, it's a relative one, we'll append the host name to make it absolute
                if (u.StartsWith("/"))
                {
                    u = uriParsed.Scheme + @"://" + uriParsed.Host + u;
                    listImageUrls[index] = u;
                }
            }
            
            
            return Json(new {
                Success = true,
                Title = title,
                Description = description,
                Images = listImageUrls,
                AbsoluteUrl = uriParsed.AbsoluteUri,
                HostName = uriParsed.Host,
            });
        }
    }
}
