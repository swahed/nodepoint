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

            return new
            {
                Count = lists.Count
            };
        }

    }
}
