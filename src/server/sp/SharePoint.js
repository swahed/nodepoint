"use strict";

var edge = require("edge");

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

exports.Site = function (Url, callback) {
	//if(typeof callback !== "function") throw "Callback parameter is not a function"; // TODO
	var self = this;
	getSite(Url, function getSiteCompleted(error, site){
		if(error) throw error;
        self.ID = site.ID;
		self.Url = site.Url; 
		self._ContructorUrl = Url;
		callback(self);
	});
};

var getWeb = edge.func(function(){/*
	#r "FakePoint.dll"
	
	using Microsoft.SharePoint;
	using System.Dynamic;

	async (input) => { 
		var site = SPContext.Current.Site;  // TODO: Does not use correct site
		using(var web = site.OpenWeb(input)) // TODO: Does not use url
		{
			return new {
				ID = web.ID.ToString("B").ToUpper(), // TODO: move Formatting to Javascript
				Url = web.Url
			};
		}
    }
*/});

var Web = function(){
	//this.ID = "";
	//this.Url = "";
};

exports.Site.Web = Web;

exports.Site.prototype.OpenWeb = function(url, callback)
{
	if(typeof url === "undefined" || url === null) {
		if(this._ContructorUrl === null)
			getWeb(this.Url);
		else
			getWeb(this._ContructorUrl);
	} else {
		throw "Not Implemented";
	}

	getWeb(url, function getSiteCompleted(error, result){
		if(error) throw error;
		var web = new Web();
        web.ID = result.ID;
		web.Url = result.Url; 
		callback(web);
	});
};