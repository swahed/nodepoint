"use strict";

var http = require('http');
var express = require('express');
var contextCreator = require("../../libs/sp/Context.js");

var context = null;

var app = express();
app.use("*", contextCreator); // TODO: This will probably duplicate all or part of the routing logic
app.get("*", function (req, res) {
    context = req.SPContext;
    res.end("done");
});

var server;
exports.setUp = function (done) {
    server = http.createServer(app).listen(port, function () {
        done();
    });
};

exports.tearDown = function (done) {
    server.close(function () {
        done();
    });
};

var testSiteId = "{BC0D7FEA-75BA-4015-8B88-A7331AF06418}";
var testSiteId2 = "{819135FE-402E-44BB-A4BA-34E9C8495A53}";

var port = 3000;
var testRequestUrl = "http://localhost:" + port + "/sites/teamsite";
var testRequestUrl2 = "http://localhost:" + port + "/sites/anotherteamsite";

var testSiteUrl = "http://localhost/sites/teamsite";
var testSiteUrl2 = "http://localhost/sites/anotherteamsite";

var testSiteTitle = "SPSite Url=http://localhost/sites/teamsite";
var testSiteTitle2 = "SPSite Url=http://localhost/sites/anotherteamsite";

exports.test_ContextIsNotNull = function (test) {
    httpGetAndEndTest(test, testRequestUrl, null, function () {
        test.notEqual(context, null, "Context object is null for url " + testRequestUrl);
        test.done();
    });
};

exports.test_ContextIsNotNull = function (test) {
    httpGetAndEndTest(test, testRequestUrl, null, function () {
        test.notEqual(context.Current, null, "Context.Current object is null for url " + testRequestUrl);
        test.done();
    });
};

exports.test_SiteIsNotNull = function (test) {
    httpGetAndEndTest(test, testRequestUrl, null, function () {
        test.notEqual(context.Current.Site, null, "Context.Current.Site object is null for url " + testRequestUrl);
        test.done();
    });
};

exports.test_SiteIsCorrect = function (test) {
    httpGetAndEndTest(test, testRequestUrl, null, function () {
        test.equal(context.Current.Site.Title, testSiteTitle, "Context.Current.Site.Title is wrong");
        test.equal(context.Current.Site.Url, testSiteUrl, "Context.Current.Site.Url is wrong");
        test.equal(context.Current.Site.ID, testSiteId, "Context.Current.Site.Id is wrong");
        test.done();
    });
};

exports.test_OtherSiteIsCorrect = function (test) {
    httpGetAndEndTest(test, testRequestUrl2, null, function () {
        test.equal(context.Current.Site.Title, testSiteTitle2, "Context.Current.Site.Title is wrong");
        test.equal(context.Current.Site.Url, testSiteUrl2, "Context.Current.Site.Url is wrong");
        test.equal(context.Current.Site.ID, testSiteId2, "Context.Current.Site.Id is wrong");
        test.done();
    });
};

/* TODO:
	Web
	List
	ListId
	ListItem
	Item
	ItemId
	Fields
	FormContext
		FormMode
	ViewContext
		View
		ViewId
		ViewType
	File
	FileLevel
	IsDesignTime
*/
 
// TODO: There should be a global methode for testing http requests
function httpGetAndEndTest(test, url, dataCallback, endCallback) {
    http.get(url, function (res) {
        test.equal(res.statusCode, 200, "Http Status not 200.");
        var receivedData = false;
        res.on("data", function (chunk) {
            receivedData = true;
            if (dataCallback) dataCallback(chunk);
        });
        res.on("end", function () {
            test.equal(receivedData, true, "Http Request did not return data");
            if (endCallback) endCallback();
        });
    }).on('error', function (e)
        {
 // <- TODO
            test.fail("Http (" + url + ") request failed with error: " + e);
            test.done();
        });
}