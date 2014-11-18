using Microsoft.SharePoint;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace nodepoint.Adpater
{
    class ListItemCollection
    {
        public async Task<object> GetItems(object input) // TODO:: Does this need to be excecuted async ?
        {
            // TODO: Input should include caml query

            SPListItemCollection items = await Task.Run(() =>
            {
                var list = input as SPList;
                // TODO Add check if web exists
                return list.Items;
            });

            var result = from item in items
                         select new
                         {
                             Title = item.Title
                         };

            return result.ToArray();
        }
    }
}
