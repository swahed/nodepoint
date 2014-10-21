"use strict";

var edge = require("edge");

var getSPSite = edge.func(function(){/*
	#r "FakePoint.dll"
	
	using Microsoft.SharePoint;
	using System.Dynamic;

	async (input) => { 
		var site = SPContext.Current.Site;

		return new {
			ID = site.ID.ToString("B").ToUpper(), // TODO
			Url = site.Url
		};
    }
*/});

exports.SPSite = function (Url, callback) {
	if(typeof callback !== "function") throw "Callback parameter is not a function!";
	var self = this;
	getSPSite(Url, function(error, site){
		if(error) throw error;
        self.ID = site.ID;
		self.Url = site.Url; 
		callback(self);
	});
};