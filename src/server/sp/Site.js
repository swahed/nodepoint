"use strict";

var edge = require("edge");
var Web = require("./web");

var getSite = edge.func(function(){/*
	#r "FakePoint.dll"

	using Microsoft.SharePoint;
	using System.Dynamic;

	async (input) => { 
		SPSite site = await Task.Run(() =>
	    {
            return new SPSite(input.ToString());
	    });

	    return new {
		    ID = site.ID.ToString("B").ToUpper(), // TODO: move Formatting to Javascript
		    Url = site.Url
	    };
    }
*/});

var Site = function (Url, callback) {
	//if(typeof callback !== "function") throw "Callback parameter is not a function"; // TODO
	//if(!url || !url.match()) TODO: Validate URL
	//	throw "Site url parameter is not a full url";
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