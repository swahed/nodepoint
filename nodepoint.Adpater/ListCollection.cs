using Microsoft.SharePoint;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace nodepoint.Adpater
{
    class ListCollection
    {
        public async Task<object> GetLists(object input) // TODO:: Does this need to be excecuted async ?
        {
            SPListCollection lists = await Task.Run(() =>
            {
                var web = input as SPWeb;
                // TODO Add check if web exists
                return web.Lists;
            });

            if (lists == null) return null; // TODO: Remove

            var results = from list in lists
                          select new
                          {
                              Title = list.Title,
                              //Fields = (from field in list.Fields  // TODO: asynch? deferred?
                              //          select new
                              //          {
                              //              Title = field.Title
                              //          }).ToArray(),
                              //Items = (from item in list.Items  // TODO: asynch? deferred?
                              //         select new
                              //         {
                              //             Title = item.Title
                              //         }).ToArray()
                          };


            return results.ToArray();
        }
    }
}
