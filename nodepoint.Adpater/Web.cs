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
        public async Task<object> GetWeb(object input) // TODO run openweb asynchronously...
        {
            var site = SPContext.Current.Site;  			// TODO: Does not use correct site

            var result = await Task.Run(() =>
            {
                if (string.IsNullOrEmpty(input as string))
                {
                    using (var web = site.OpenWeb())
                    {
                        return new
                        {
                            ID = web.ID.ToString("B").ToUpper(), 	// TODO: move Formatting to Javascript
                            Title = web.Title,
                            Url = web.Url,
                            AllowUnsafeUpdates = true
                        };
                    }
                }
                else
                {
                    var s = input as string;
                    Guid id = new Guid();
                    if (Guid.TryParse(s, out id))
                    {
                        using (var web = site.OpenWeb(id))
                        {
                            return new
                            {
                                ID = web.ID.ToString("B").ToUpper(), 	// TODO: move Formatting to Javascript
                                Title = web.Title,
                                Url = web.Url,
                                AllowUnsafeUpdates = true
                            };
                        }
                    }
                    else
                    {
                        using (var web = site.OpenWeb(s))
                        {
                            return new
                            {
                                ID = web.ID.ToString("B").ToUpper(), 	// TODO: move Formatting to Javascript
                                Title = web.Title,
                                Url = web.Url,
                                AllowUnsafeUpdates = true
                            };
                        }
                    }
                }
            });

            return result;
        }

    }
}
