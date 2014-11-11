"use strict";

var Site = require("../../libs/sp/site");

var testSiteId = "{BC0D7FEA-75BA-4015-8B88-A7331AF06418}";
var testRootWebId = "{23A258FF-CEB6-4ABD-9069-0EDD1991D5FD}";
var testSubWebId = "{D5A29DC2-2C8B-4FF6-AC32-5E891D373B1C}"; // TODO: Implement a Guid object - new Guid("{D5A29DC2-2C8B-4FF6-AC32-5E891D373B1C}")
var testSiteId2 = "{819135FE-402E-44BB-A4BA-34E9C8495A53}";

var testSiteUrl = "http://localhost/sites/teamsite";
var testSubWebUrl = "http://localhost/sites/teamsite/subsite";
var testSiteUrl2 = "http://localhost/sites/anotherteamsite";
var testNonExistentSiteUrl = "http://localhost/sites/nonexistent";

var testSiteTitle = "SPSite Url=http://localhost/sites/teamsite";
var testSiteTitle2 = "SPSite Url=http://localhost/sites/anotherteamsite";

exports.SiteModuleExportsFunction = function(test){
    test.equal(Site !== null, true, "Exported object is null.");
    test.equal(typeof Site, "function", "Exported object is not a function.");
    test.done();
};

exports.SiteHasCorrectId = function(test){
    var site = new Site(testSiteUrl, function(site){ // TODO: Why can this not be accomplished with a closure
		test.equal(site.ID, testSiteId);
        site = new Site(testSiteId, function(site){ 
            test.equal(site.ID, testSiteId);
            var anotherSite = new Site(testSiteId2, function(anotherSite){ 
                test.equal(anotherSite.ID, testSiteId2);
                anotherSite = new Site(testSiteUrl2, function(anotherSite){ 
                    test.equal(anotherSite.ID, testSiteId2);
                    test.done();
                });
            });
        });
	});
};

exports.SiteHasCorrectUrl = function(test){
    var site = new Site(testSiteUrl, function(site){
        test.equal(site.Url, testSiteUrl);
        site = new Site(testSiteId, function(site){
            test.equal(site.Url, testSiteUrl);
            var anotherSite = new Site(testSiteUrl2, function(anotherSite){ 
                test.equal(anotherSite.Url, testSiteUrl2);
                anotherSite = new Site(testSiteId2, function(anotherSite){ 
                    test.equal(anotherSite.Url, testSiteUrl2);
                    test.done();
                });
            });
        });
    });
};

exports.SiteHasCorrectTitle = function(test){
    var site = new Site(testSiteUrl, function(site){
        test.equal(site.Title, testSiteTitle);
        site = new Site(testSiteId, function(site){
            test.equal(site.Title, testSiteTitle);
            var anotherSite = new Site(testSiteUrl2, function(anotherSite){ 
                test.equal(anotherSite.Title, testSiteTitle2);
                anotherSite = new Site(testSiteId2, function(anotherSite){ 
                    test.equal(anotherSite.Title, testSiteTitle2);
                    test.done();
                });
            });
        });
    });
};

exports.NonExistentUrlReturnsNull = function(test) {
    var site = new Site(testNonExistentSiteUrl, function(site){
        test.equal(site, null);
            test.done();

        // TODO:
        // site = new Site(testNonExistentSiteUrl, function(){
        //     test.equal(site, null);
        //     test.done();
        // });
    });
};

exports.OpenWebOpenRootWebWhenSiteWasCreatedWithRootWebUrl = function(test){
    var site = new Site(testSiteUrl, function(site){
        var web = site.OpenWeb(null, function(web){
            test.equal(web.ID, testRootWebId, "Wrong ID for web with url" + testSiteUrl);
            test.done();
        });
    });
};

exports.OpenWebOpensubWebWhenSiteWasCreatedWithsubWebUrl = function(test){
    var site = new Site(testSubWebUrl, function(site){
        var web = site.OpenWeb(null, function(web){
            test.equal(web.ID, testSubWebId, "Wrong ID for web with url " + testSubWebUrl);
            test.done();
        });
    });
};

exports.OpenWebOpenSubWebWhenSiteWasCreatedWithsubWebUrl = function(test){
    var site = new Site(testSubWebUrl, function(site){
        var web = site.OpenWeb(testSubWebUrl, function(web){
            test.equal(web.ID, testSubWebId);
            test.done();
        });
    });
};

exports.OpenWebOpenRootWebWhenSiteWasCreatedWithsubWebUrl = function(test){
    var site = new Site(testSubWebUrl, function(site){
        var web = site.OpenWeb(testSiteUrl, function(web){
            test.equal(web.ID, testRootWebId);
            test.done();
        });
    });
};

// TODO: Conecpt on how to implement this... options object? {Url: ..., ID: ...}
//exports.OpenWebOpensubWebById = function(test){
//    test.fail(":)");
//    var site = new Site(testSubWebUrl, function(site){
//        var web = site.OpenWeb(testSubWebId, function(web){
//            test.equal(web.ID, testSubWebId);
//            test.equal(web.Url, testSubWebUrl);
//            test.done();
//        });
//    });
//};

exports.RootWebIsCorrect = function(test){
    var site = new Site(testSubWebUrl, function(site){
        var rootWeb = site.RootWeb;
        test.equal(rootWeb.ID, testRootWebId);
        test.done();
    });
};

//exports.DiposeDisposes = function(test){
//    var site = new Site(testSubWebUrl, function(site){
//        site.Dispose(); 
//        test.IsNull(site);
//    });
//};