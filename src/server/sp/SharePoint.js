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
		getWeb(site.Url, function getRootWebCompleted(error, web) {
			self.RootWeb = web;
			callback(self);
		});
	});
};

var getWeb = edge.func(function(){/*
	#r "FakePoint.dll"
	
	using Microsoft.SharePoint;
	using System.Dynamic;

	async (input) => { 
        var site = SPContext.Current.Site;  			// TODO: Does not use correct site

        if(string.IsNullOrEmpty(input as string))
        {
			using(var web = site.OpenWeb())
	        {
		        return new {
			        ID = web.ID.ToString("B").ToUpper(), 	// TODO: move Formatting to Javascript
			        Url = web.Url
		        };
	        }
        }else{
        	var url = (string)input;
	        using(var web = site.OpenWeb(url))
	        {
		        return new {
			        ID = web.ID.ToString("B").ToUpper(), 	// TODO: move Formatting to Javascript
			        Url = web.Url
		        };
	        }
        }
    }
*/});

var Web = function(){
};

exports.Site.Web = Web;

exports.Site.prototype.OpenWeb = function(url, callback)
{
	if(typeof url === "undefined" || url === null) {
		if(this._ContructorUrl === null) {
			getWeb(this.Url, getWebComplete);
		}
		else {
			getWeb(this._ContructorUrl, getWebComplete);
		}
	} else {
		getWeb(url, getWebComplete);
	}

	function getWebComplete(error, result){
		if(error) throw error;
		var web = new Web();
        web.ID = result.ID;
		web.Url = result.Url; 
		callback(web);
	}
};