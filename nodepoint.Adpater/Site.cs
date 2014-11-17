using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.SharePoint;
using System.Dynamic;

namespace nodepoint.Adpater
{
    public class Site
	{
		public async Task<object> GetSite(object input)
		{
		    SPSite site = await Task.Run(() =>
            {
                var s = input as string;
                Guid id = new Guid();
                SPSite result = null;
                // TODO Add check if site exists
                try
                {
                    if (Guid.TryParse(s, out id))
                        result = new SPSite(id);
                    else
                        result = new SPSite(s);
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error " + ex);
                    //throw; // TODO: Exception makes edge crash and cannot be handled. Return error object
                }

                return result;
            });

            if (site == null) return null; // TODO: Implement error handlin and logging in js instead: throw new Exception("Website was not found. Input: " + input.ToString());

            return new
            {
                Title = site.Title,
                ID = site.ID.ToString("B").ToUpper(), // TODO: move Formatting to Javascript
                Url = site.Url,
                OpenWeb = new Func<object, Task<object>>(
                async (i) =>
                {
                    if(i==null)
                        return await new Web().GetWeb(input);
                    else
                        return await new Web().GetWeb(i);
                }),
                RootWeb = new // TODO: Duplicate to Web.cs
                {
                    ID = site.RootWeb.ID.ToString("B").ToUpper(), 	// TODO: move Formatting to Javascript
                    Title = site.RootWeb.Title,
                    Url = site.RootWeb.Url,
                    AllowUnsafeUpdates = true,
                    Lists = await new ListCollection().GetLists(site.RootWeb)
                }
            };
		}
	}	
}
