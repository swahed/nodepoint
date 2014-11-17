using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Threading.Tasks;
using nodepoint.Adpater;

namespace nodepoint.Adpater_Tests
{
    [TestClass]
    public class SPWeb_Test
    {
        string testRootWebId = "{23A258FF-CEB6-4ABD-9069-0EDD1991D5FD}";
        string testSubWebId = "{D5A29DC2-2C8B-4FF6-AC32-5E891D373B1C}";

        string testSiteUrl = "http://localhost/sites/teamsite";
        string testSubWebUrl = "http://localhost/sites/teamsite/subsite";

        string testRootWebTitle = "Teamsite Rootweb";
        string testSubWebTitle = "Teamsite Subweb";

        [TestMethod]
        public async Task WebHasCorrectId()
        {
            dynamic site = await (new Site()).GetSite(testSiteUrl);
            dynamic web = await site.OpenWeb(testSubWebUrl);
            Assert.AreEqual(testSubWebId, web.ID);
        }

        [TestMethod]
        public async Task WebHasCorrectUrl()
        {
            dynamic site = await (new Site()).GetSite(testSiteUrl);
            dynamic web = await site.OpenWeb(testSubWebId);
            Assert.AreEqual(testSubWebUrl, web.Url);
        }

        [TestMethod]
        public async Task WebHasCorrectTitle()
        {
            dynamic site = await (new Site()).GetSite(testSiteUrl);
            dynamic web = site.RootWeb;
            Assert.AreEqual(testRootWebTitle, web.Title);
            dynamic web1 = await site.OpenWeb(testSubWebId);
            Assert.AreEqual(testSubWebTitle, web1.Title);
        }

        [TestMethod]
        public async Task AllowUnsafeUpdatesIsTrueAsDefault()
        {
            dynamic site = await (new Site()).GetSite(testSiteUrl);
            dynamic web = site.RootWeb;
            Assert.IsTrue(web.AllowUnsafeUpdates);
        }

        //[TestMethod]
        //public async Task ListCollectionNotNull()
        //{
        //    dynamic site = await (new Site()).GetSite(testSiteUrl);
        //    dynamic web = site.RootWeb;
        //    Assert.IsNotNull(web.Lists);
        //}
    }
}
