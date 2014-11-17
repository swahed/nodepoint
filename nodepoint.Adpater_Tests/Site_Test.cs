using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using nodepoint.Adpater;
using System.Threading.Tasks;

namespace nodepoint.Adpater_Tests
{
    [TestClass]
    public class SPSite_Test
    {
        string testSiteId = "{BC0D7FEA-75BA-4015-8B88-A7331AF06418}";
        string testRootWebId = "{23A258FF-CEB6-4ABD-9069-0EDD1991D5FD}";
        string testSubWebId = "{D5A29DC2-2C8B-4FF6-AC32-5E891D373B1C}";
        string testSiteId2 = "{819135FE-402E-44BB-A4BA-34E9C8495A53}";

        string testSiteUrl = "http://localhost/sites/teamsite";
        string testSubWebUrl = "http://localhost/sites/teamsite/subsite";
        string testSiteUrl2 = "http://localhost/sites/anotherteamsite";

        string testSiteTitle = "SPSite Url=http://localhost/sites/teamsite";
        string testSiteTitle2 = "SPSite Url=http://localhost/sites/anotherteamsite";

        string testNonexistentWebUrl = "http://localhost/sites/nonexistent";

        Site siteAdapter = new Site();

        [TestMethod]
        public async Task SiteHasCorrectId()
        {
            dynamic site = await siteAdapter.GetSite(testSiteUrl);
            Assert.AreEqual(testSiteId, site.ID);
            site = await siteAdapter.GetSite(testSiteId);
            Assert.AreEqual(testSiteId, site.ID);
            site = await siteAdapter.GetSite(testSiteUrl2);
            Assert.AreEqual(testSiteId2, site.ID);
            site = await siteAdapter.GetSite(testSiteId2);
            Assert.AreEqual(testSiteId2, site.ID);
        }

        [TestMethod]
        public async Task SiteHasCorrectUrl()
        {
            dynamic site = await siteAdapter.GetSite(testSiteId);
            Assert.AreEqual(testSiteUrl, site.Url);
            site = await siteAdapter.GetSite(testSiteUrl);
            Assert.AreEqual(testSiteUrl, site.Url);
            site = await siteAdapter.GetSite(testSubWebUrl);
            Assert.AreEqual(testSiteUrl, site.Url);
            site = await siteAdapter.GetSite(testSiteUrl2);
            Assert.AreEqual(testSiteUrl2, site.Url);
            site = await siteAdapter.GetSite(testSiteId2);
            Assert.AreEqual(testSiteUrl2, site.Url);
        }

        [TestMethod]
        public async Task SiteHasCorrectTitle()
        {
            dynamic site = await siteAdapter.GetSite(testSiteId);
            Assert.AreEqual(testSiteTitle, site.Title);
            site = await siteAdapter.GetSite(testSiteUrl);
            Assert.AreEqual(testSiteTitle, site.Title);
            site = await siteAdapter.GetSite(testSubWebUrl);
            Assert.AreEqual(testSiteTitle, site.Title);
            site = await siteAdapter.GetSite(testSiteUrl2);
            Assert.AreEqual(testSiteTitle2, site.Title);
            site = await siteAdapter.GetSite(testSiteId2);
            Assert.AreEqual(testSiteTitle2, site.Title);
        }

        [TestMethod]
        public async Task NonExistentUrlReturnsNull()
        {
            dynamic site = await siteAdapter.GetSite(testNonexistentWebUrl);
            Assert.IsNull(site);
        }

        [TestMethod]
        public async Task OpenWebOpenRootWebWhenSiteWasCreatedWithRootWebUrl()
        {
            dynamic site = await siteAdapter.GetSite(testSiteUrl);
            dynamic web = await site.OpenWeb(null);
            Assert.AreEqual(testRootWebId, web.ID);
        }

        [TestMethod]
        public async Task OpenWebOpensubWebWhenSiteWasCreatedWithsubWebUrl()
        {
            dynamic site = await siteAdapter.GetSite(testSubWebUrl);
            dynamic web = await site.OpenWeb(null);
            Assert.AreEqual(testSubWebId, web.ID);
        }

        [TestMethod]
        public async Task OpenWebOpenRootWebByUrl()
        {
            dynamic site = await siteAdapter.GetSite(testSiteUrl);
            dynamic web = await site.OpenWeb(testSiteUrl);
            Assert.AreEqual(testRootWebId, web.ID);

            dynamic site1 = await siteAdapter.GetSite(testSubWebUrl);
            dynamic web1 = await site1.OpenWeb(testSiteUrl);
            Assert.AreEqual(testRootWebId, web1.ID);
        }

        [TestMethod]
        public async Task OpenWebOpensubWebByUrl()
        {
            dynamic site = await siteAdapter.GetSite(testSubWebUrl);
            dynamic web = await site.OpenWeb(testSubWebUrl);
            Assert.AreEqual(testSubWebId, web.ID);

            dynamic site1 = await siteAdapter.GetSite(testSiteUrl);
            dynamic web1 = await site1.OpenWeb(testSubWebUrl);
            Assert.AreEqual(web1.ID, testSubWebId);
        }

        [TestMethod]
        public async Task OpenWebOpensubWebById()
        {
            dynamic site = await siteAdapter.GetSite(testSubWebUrl);
            dynamic web = await site.OpenWeb(testSubWebId);
            Assert.AreEqual(testSubWebId, web.ID);
        }

        [TestMethod]
        public async Task RootWebIsCorrect()
        {
            dynamic site = await siteAdapter.GetSite(testSubWebUrl);
            dynamic rootWeb = site.RootWeb;
            Assert.AreEqual(testRootWebId, rootWeb.ID);
            Assert.AreEqual(testSiteUrl, rootWeb.Url);
        }
    }
}
