using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using nodepoint.Adpater;
using System.Threading.Tasks;

namespace nodepoint.Adpater_Tests
{
    [TestClass]
    public class SPList_Test
    {
        string testSiteUrl = "http://localhost/sites/teamsite";
        int testListId = 11;

        //[TestInitialize] // TODO: Does not support async?
        private async Task<dynamic> InitAsync()
        {
            dynamic site = await (new Site()).GetSite(testSiteUrl);
            dynamic web = await site.OpenWeb(null);
            return web.Lists[testListId];
        }

        [TestMethod]
        public async Task TitleIsCorrect()
        {
            dynamic list = await InitAsync();
            Assert.AreEqual("Site Pages", list.Title);
        }

        //[TestMethod]
        //public async Task ItemsIsNotNull()
        //{
        //    dynamic list = await InitAsync();
        //    Assert.IsNotNull(list.Items);
        //}

        //[TestMethod]
        //public async Task ItemsCountCorrect()
        //{
        //    dynamic list = await InitAsync();
        //    Assert.AreEqual(1, list.Items.Length);
        //}

        //[TestMethod]
        //public async Task FieldsIsNotNull()
        //{
        //    Assert.IsNotNull(list.Fields);
        //}

        //[TestMethod]
        //public async Task ItemsReturnsNotNull()
        //{
        //    SPListItemCollection items = list.Items;
        //    Assert.IsNotNull(items);
        //}

        //[TestMethod]
        //public async Task GetItemsReturnsNotNull()
        //{
        //    SPListItemCollection items = list.Items;
        //    items = list.GetItems(new SPQuery());
        //    Assert.IsNotNull(items);
        //}

        //// GetItems returns correct number of items -> SPListItemsCollection
        //[TestMethod]
        //public async Task GetItemsRetrunsCorrectNumberOfitems()
        //{
        //    SPListItemCollection items = list.Items;
        //    items = list.GetItems(new SPQuery());
        //    Assert.AreEqual(1, items.Count);
        //}

        //[TestMethod]
        //public async Task GetItemByIdReturnsCorrectItem()
        //{
        //    SPItem item = list.GetItemById(11);
        //    Assert.AreEqual(11, item.ID);
        //}

        // Update() does nothing?
        //[TestMethod]
        //public async Task UpdateUpdates()
        //{
        //    list.Update();
        //    Assert.Fail();
        //}

        // Deletes() deletes // TODO: Doesn't thsi need allowunsafeupdates ans web.Update() ?
        //[TestMethod]
        //public async Task DeleteDeletes()
        //{
        //    list.Delete();
        //    Assert.IsNull(list);
        //}
    }
}
