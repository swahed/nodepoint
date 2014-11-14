"use strict";

var Site = require("../../libs/sp/site");
var Web = require("../../libs/sp/web");

var testRootWebId = "{23A258FF-CEB6-4ABD-9069-0EDD1991D5FD}";
var testSubWebId = "{D5A29DC2-2C8B-4FF6-AC32-5E891D373B1C}";
var testSubWebUrl = "http://localhost/sites/teamsite/subsite";
var testOtherSubWebId = "{0D7AB796-0D1F-4C58-BCD1-A1205F9D85E9}";
var testOtherSubWebUrl = "http://localhost/sites/teamsite/subsite2";

var testRootWebTitle = "Teamsite Rootweb";
var testSubWebTitle = "Teamsite Subweb";
var testRootWebTitle2 = "Teamsite 2 Rootweb";

var site;
// TODO: Setup with other site
exports.setUp = function (done) {
    site = new Site(testSubWebUrl, function () {
        done();
    });
};

/* TODO
exports.ConstructorWithIDOpensCorrectWeb = function(test){
    var web = new Web(null, function(){
        test.equal(web.ID, testSubWebId, "Wrong ID for web with url" + testSubWebUrl);
        test.done();
    });
};
*/

exports.ConstructorWithIDOpensCorrectWeb = function (test) {
    var web = new Web(testSubWebId, function () { // TODO: Why can't this be accomplished by a closure as with the site object?
        test.equal(web.ID, testSubWebId, "Wrong ID for web with url" + testSubWebUrl);
        test.equal(web.Url, testSubWebUrl, "Wrong Url for web with ID" + testSubWebId);
        test.done();
    });
};

exports.ConstructorWithUrlOpensCorrectWeb = function (test) {
    var web = new Web(testOtherSubWebUrl, function () {
        test.equal(web.ID, testOtherSubWebId, "Wrong ID for web with url" + testOtherSubWebUrl);
        test.equal(web.Url, testOtherSubWebUrl, "Wrong Url for web with ID" + testOtherSubWebId);
        test.done();
    });
};

exports.GetterWithoutParameterOpensWebFromRequestUrl = function (test) {
    var web = site.OpenWeb(null, function () {
        test.equal(web.ID, testSubWebId, "Wrong ID for web with url" + testSubWebUrl);
        test.done();
    });
};

exports.GetterWithIDOpensCorrectWeb = function (test) {
    var web = site.OpenWeb(null, function () {
        test.equal(web.ID, testSubWebId, "Wrong ID for web with url" + testSubWebUrl);
        test.done();
    });
};

exports.GetterWithUrlOpensCorrectWeb = function (test) {
    var web = site.OpenWeb(testOtherSubWebUrl, function () {
        test.equal(web.ID, testOtherSubWebId, "Wrong ID for web with url" + testOtherSubWebUrl);
        test.done();
    });
};

exports.WebHasCorrectUrl = function (test) {
    var web = site.OpenWeb(testSubWebId, function () {
        test.equal(web.Url, testSubWebUrl, "Wrong Url for web with url" + testSubWebId);
        test.done();
    });
};

exports.WebHasCorrectTitle = function (test) {
    var web     = site.RootWeb;
    test.equal(web.Title, testRootWebTitle, "Wrong Title for web with url " + site.Url);
    web = site.OpenWeb(testSubWebId, function () {
        test.equal(web.Title, testSubWebTitle, "Wrong Title for web with url" + testSubWebId);
        test.done();
    });
};

exports.ListCollectionNotNull = function (test) {
    test.notEqual(site.RootWeb.Lists, null);
    test.done();
};