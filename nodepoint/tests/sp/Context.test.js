"use strict";

var http = require('http');
var express = require('express');
var contextCreator = require("../../libs/sp/Context.js");
var httpUtil = require("../../tests/testUtility.js");

var testSiteId = "{BC0D7FEA-75BA-4015-8B88-A7331AF06418}";
var testSiteId2 = "{819135FE-402E-44BB-A4BA-34E9C8495A53}";

var port = 3000;
var testRequestUrl = "http://localhost:" + port + "/sites/teamsite";
var testRequestUrl2 = "http://localhost:" + port + "/sites/anotherteamsite";

var testSiteUrl = "http://localhost/sites/teamsite";
var testSiteUrl2 = "http://localhost/sites/anotherteamsite";

var testSiteTitle = "SPSite Url=http://localhost/sites/teamsite";
var testSiteTitle2 = "SPSite Url=http://localhost/sites/anotherteamsite";

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

exports.test_ContextIsNotNull = function (test) {
    httpUtil.httpGetAndEndTest(testRequestUrl, function () {
        test.notEqual(context, null, "Context object is null for url " + testRequestUrl);
        test.done();
    });
};

exports.test_ContextIsNotNull = function (test) {
    httpUtil.httpGetAndEndTest(testRequestUrl, function () {
        test.notEqual(context.Current, null, "Context.Current object is null for url " + testRequestUrl);
        test.done();
    });
};

exports.test_SiteIsNotNull = function (test) {
    httpUtil.httpGetAndEndTest(testRequestUrl, function () {
        test.notEqual(context.Current.Site, null, "Context.Current.Site object is null for url " + testRequestUrl);
        test.done();
    });
};

exports.test_SiteIsCorrect = function (test) {
    httpUtil.httpGetAndEndTest(testRequestUrl, function () {
        test.equal(context.Current.Site.Title, testSiteTitle, "Context.Current.Site.Title is wrong");
        test.equal(context.Current.Site.Url, testSiteUrl, "Context.Current.Site.Url is wrong");
        test.equal(context.Current.Site.ID, testSiteId, "Context.Current.Site.Id is wrong");
        test.done();
    });
};

exports.test_OtherSiteIsCorrect = function (test) {
    httpUtil.httpGetAndEndTest(testRequestUrl2, function () {
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