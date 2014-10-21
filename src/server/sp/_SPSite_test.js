"use strict";

var testSiteId = "{BC0D7FEA-75BA-4015-8B88-A7331AF06418}";
var testRootWebId = "{23A258FF-CEB6-4ABD-9069-0EDD1991D5FD}";
var testSubWebId = "{D5A29DC2-2C8B-4FF6-AC32-5E891D373B1C}"; // TODO: Implement a Guid object - new Guid("{D5A29DC2-2C8B-4FF6-AC32-5E891D373B1C}")

var testSiteUrl = "http://localhost/sites/teamsite";
var testSubWebUrl = "http://localhost/sites/teamsite/subsite";

var SPSite = require("./SPSite");

exports.SiteModuleExportsFunction = function(test){
    test.equal(SPSite.SPSite !== null, true, "Exported object is null.");
    test.equal(typeof SPSite.SPSite, "function", "Exported object is not a function.");
    test.done();
};

exports.SiteHasCorrectId = function(test){
    var site = new SPSite.SPSite("http://localhost/sites/teamsite", function(site){ // TODO: Why can this not be accomplished ith a closure
		test.equal(site.ID, testSiteId);
		test.done();
	});
};

/* 



        

        // TODO: Test with relative urls (if supported by SharePoint)

        [TestMethod]
        public void SiteHasCorrectUrl()
        {
            SPSite site = new SPSite(testSiteId);
            Assert.AreEqual(site.Url, testSiteUrl);
        }

        // TODO: Correct site needs to be opened if the url of a subweb was entered

        [TestMethod]
        public void OpenWebOpenRootWebWhenSiteWasCreatedWithRootWebUrl()
        {
            SPSite site = new SPSite(testSiteUrl);
            SPWeb web = site.OpenWeb();
            Assert.AreEqual(web.ID, testRootWebId);
        }

        [TestMethod]
        public void OpenWebOpensubWebWhenSiteWasCreatedWithsubWebUrl()
        {
            SPSite site = new SPSite(testSubWebUrl);
            SPWeb web = site.OpenWeb();
            Assert.AreEqual(web.ID, testSubWebId);
        }

        // TODO: Correct web needs to be opened if the url of an element within the web (i.e. list) has been entereds

        [TestMethod]
        public void OpenWebOpensubWebByUrl()
        {
            SPSite site = new SPSite(testSubWebUrl);
            SPWeb web = site.OpenWeb(testSubWebUrl);
            Assert.AreEqual(web.ID, testSubWebId);
        }

        [TestMethod]
        public void OpenWebOpensubWebById()
        {
            SPSite site = new SPSite(testSubWebUrl);
            SPWeb web = site.OpenWeb(testSubWebId);
            Assert.AreEqual(web.ID, testSubWebId);
        }

        [TestMethod]
        public void RootWebIsCorrect()
        {
            SPSite site = new SPSite(testSubWebUrl);
            SPWeb rootWeb = site.RootWeb;
            Assert.AreEqual(rootWeb.ID, testRootWebId);
            Assert.AreEqual(rootWeb.Url, testSiteUrl);
        }

        [TestMethod]
        public void DisposeInUsingBlock()
        {
            using (SPSite site = new SPSite(testSiteId))
            {
            }
        }

        // TODO:
        //[TestMethod]
        //public void DiposeDisposes()
        //{
        //    SPSite site = new SPSite(testSubWebUrl);
        //    site.Dispose();
        //    System.GC.WaitForPendingFinalizers();
        //    Assert.IsNull(site);
        //}
*/