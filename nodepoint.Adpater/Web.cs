using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.SharePoint;
using System.Dynamic;

namespace nodepoint.Adpater
{
    class Web
    {
        public async Task<object> GetWeb(object input)
        {
            var site = SPContext.Current.Site;  			// TODO: Does not use correct site
            SPWeb web = await Task.Run(() =>
            {
                SPWeb result;
                if (string.IsNullOrEmpty(input as string))
                {
                    result = site.OpenWeb();
                }
                else
                {
                    var s = input as string;
                    Guid id = new Guid();
                    if (Guid.TryParse(s, out id))
                        result = site.OpenWeb(id);
                    else
                        result = site.OpenWeb(s);
                }

                return result;
            });
            
            return new
            {
                ID = web.ID.ToString("B").ToUpper(), 	// TODO: move Formatting to Javascript
                Title = web.Title,
                Url = web.Url,
                AllowUnsafeUpdates = true,
                Lists = await (new ListCollection()).GetLists(web)
            };
        }

    }
}
