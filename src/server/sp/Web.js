"use strict";

var edge = require("edge");

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

var Web = function (Url, callback) {
	var self = this;
	getWeb(Url, function getWebComplete(error, result){
		if(error) throw error;
        this.ID = result.ID;
		this.Url = result.Url; 
		callback(this);
	});
};

module.exports = Web;