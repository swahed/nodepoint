using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using nodepoint.Adpater;
using System.Threading.Tasks;

namespace nodepoint.Adpater_Tests
{
    [TestClass]
    public class SPListCollection_Test
    {
        string testSiteUrl = "http://localhost/sites/teamsite";

        //[TestInitialize] // TODO: Does not support async?
        private async Task<dynamic> InitAsync()
        {
            dynamic site = await (new Site()).GetSite(testSiteUrl);
            dynamic web = await site.OpenWeb(null);
            return web.Lists;
        }

        [TestMethod]
        public async Task ListCollectionCountIsCorrect()
        {
            dynamic collection = await InitAsync();
            Assert.AreEqual(19, collection.Length);
        }

        [TestMethod]
        public async Task GetListByIdReturnsCorrectList()
        {
            dynamic collection = await InitAsync();
            dynamic list = collection[11];
            Assert.AreEqual("Site Pages", list.Title);
        }

        // TODO
        //[TestMethod]
        //public async Task GetListByNameReturnsCorrectList()
        //{
        //    dynamic collection = await InitAsync();
        //    dynamic list = collection["Site Pages"];
        //    Assert.AreEqual(new Guid("{0A780E47-DD15-4C9C-A91A-3FDD1C815BB8}"), list.ID);
        //}

        // TODO
        //[TestMethod]
        //public async Task TryGetListReturnsCorrectList()
        //{
        //    dynamic collection = await InitAsync();
        //    dynamic list = collection.TryGetList("Site Pages");
        //    Assert.AreEqual(new Guid("{0A780E47-DD15-4C9C-A91A-3FDD1C815BB8}"), list.ID);
        //}

        // TODO
        //[TestMethod]
        //public async Task TryGetListReturnsNullIfListDoesNotExist()
        //{
        //    dynamic collection = await InitAsync();
        //    dynamic list = collection.TryGetList("Nonexistent list");
        //    Assert.IsNull(list);
        //}

        [TestMethod]
        public async Task IteratorWorks()
        {
            dynamic collection = await InitAsync();
            foreach (dynamic list in collection)
            {
                string s = list.Title;
            }
        }             
    }
}
