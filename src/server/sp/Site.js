"use strict";

var edge = require("edge");
var Web = require("./web");

var getSite = edge.func(function(){/*
	#r "FakePoint.dll"
	
	using Microsoft.SharePoint;
	using System.Dynamic;

	async (input) => { 
		var site = SPContext.Current.Site; // TODO: Does not use url parameter

		return new {
			ID = site.ID.ToString("B").ToUpper(), // TODO: move Formatting to Javascript
			Url = site.Url
		};
    }
*/});

var Site = function (Url, callback) {
	//if(typeof callback !== "function") throw "Callback parameter is not a function"; // TODO
	var self = this;
	getSite(Url, function getSiteCompleted(error, site){
		if(error) throw error;
        self.ID = site.ID;
		self.Url = site.Url; 
		self._ContructorUrl = Url;
		var web = new Web(site.Url, function getRootWebCompleted(web) {
			self.RootWeb = web;
			callback(self);
		});
	});
};

Site.prototype.OpenWeb = function(openUrl, callback)
{
	var webUrl = openUrl;
	if(typeof webUrl === "undefined" || webUrl === null) {
		if(this._ContructorUrl === null) {
			webUrl = this.Url;
		}
		else {
			webUrl = this._ContructorUrl;
		}
	}

	var web = new Web(webUrl, function OpenWebComplete(web){ // TODO: web.Web??
		callback(web);
	});
};

module.exports = Site;