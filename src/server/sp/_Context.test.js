"use strict";

var http = require('http');
var express = require('express');
//var server = require("../server.js");

var app = express();
var contextCreator = require("./Context.js");

exports.test_ContextIsNotNull = function(test){
	var context = null;

	app.use("*", contextCreator);
	app.get("/sites/:sitename", function(req, res){
		context = req.SPContext;
		res.end("done");
	});

	var port = 3000;
	http.createServer(app).listen(port, function() {
		var url = "http://localhost:" + port + "/sites/teamsite";
		httpGetAndEndTest(test, url, null, function(){
			test.notEqual(context, null, "Context object is null for url " + url);
			test.notEqual(context.Current, null, "Context.Current object is null for url " + url); 
			test.notEqual(context.Current.Site, null, "Context.Current.Site object is null for url " + url);
			test.equal(context.Current.Site.Title, "SPSite Url=http://localhost/sites/teamsite", "Context.Current.Site.Title is wrong");
			test.equal(context.Current.Site.Url, url.replace(":" + port, ""), "Context.Current.Site.Url is wrong"); // TODO: Decide on how the port No should be mapped on SharePoint machines
			
			test.done();
			/*url = "http://localhost:" + port + "/sites/teamsite2";
			httpGetAndEndTest(test, url, null, function(){
				test.equal(context.Current.Site.Title, "SPSite Url=http://localhost/sites/teamsite2", "Context.Current.Site.Title is wrong");
				test.equal(context.Current.Site.Url, url.replace(":" + port, ""), "Context.Current.Site.Url is wrong");
				test.done();
			});*/
		});

		
	});
};
 
// TODO: There should be a global methode for testing http requests
function httpGetAndEndTest(test, url, dataCallback, endCallback){
	http.get(url, function(res){
		test.equal(res.statusCode, 200, "Http Status not 200.");
		var receivedData = false;
		res.on("data", function(chunk){
			receivedData = true;
			if(dataCallback) dataCallback(chunk);
		});
		res.on("end", function(){
			test.equal(receivedData, true, "Http Request did not return data");
			if(endCallback) endCallback();
		});		
	}).on('error', function(e) { // <- TODO
		test.fail("Http (" + url + ") request failed with error: " + e);
		test.done();
	});
}