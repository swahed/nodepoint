"use strict";

var testSiteId = "{BC0D7FEA-75BA-4015-8B88-A7331AF06418}";
var testRootWebId = "{23A258FF-CEB6-4ABD-9069-0EDD1991D5FD}";
var testSubWebId = "{D5A29DC2-2C8B-4FF6-AC32-5E891D373B1C}"; // TODO: Implement a Guid object - new Guid("{D5A29DC2-2C8B-4FF6-AC32-5E891D373B1C}")

var testSiteUrl = "http://localhost/sites/teamsite";
var testSubWebUrl = "http://localhost/sites/teamsite/subsite";

var SP = require("./SharePoint");

exports.SiteModuleExportsFunction = function(test){
    test.equal(SP.Site !== null, true, "Exported object is null.");
    test.equal(typeof SP.Site, "function", "Exported object is not a function.");
    test.done();
};

exports.SiteHasCorrectId = function(test){
    var site = new SP.Site("http://localhost/sites/teamsite", function(site){ // TODO: Why can this not be accomplished ith a closure
		test.equal(site.ID, testSiteId);
		test.done();
	});
};

exports.SiteHasCorrectUrl = function(test){
    var site = new SP.Site("http://localhost/sites/teamsite", function(site){
        test.equal(site.Url, testSiteUrl);
        test.done();
    });
};

exports.OpenWebOpenRootWebWhenSiteWasCreatedWithRootWebUrl = function(test){
    var site = new SP.Site(testSiteUrl, function(site){
        var web = site.OpenWeb(null, function(web){
            test.equal(web.ID, testRootWebId);
            test.done();
        });
    });
};

exports.OpenWebOpensubWebWhenSiteWasCreatedWithsubWebUrl = function(test){
    var site = new SP.Site(testSubWebUrl, function(site){
        var web = site.OpenWeb(null, function(web){
            test.equal(web.ID, testSubWebId);
            test.done();
        });
    });
};

/* 
       

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