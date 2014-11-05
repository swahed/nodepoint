"use strict";

var edge = require("edge");

var getWeb = edge.func(function () {/*
	#r "tests_mocks\FakePoint.dll"
	
	using Microsoft.SharePoint;
	using System.Dynamic;

	async (input) => { 
        SPContext.Initialize("tests_mocks/FakePoint.Fakes");
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
        }
        else
        {
        	var s = input as string;
            Guid id = new Guid();
            if (Guid.TryParse(s, out id))
            {
                using(var web = site.OpenWeb(id))
		        {
			        return new {
				        ID = web.ID.ToString("B").ToUpper(), 	// TODO: move Formatting to Javascript
				        Url = web.Url
			        };
		        }
            }
            else
            {
                using(var web = site.OpenWeb(s))
		        {
			        return new {
				        ID = web.ID.ToString("B").ToUpper(), 	// TODO: move Formatting to Javascript
				        Url = web.Url
			        };
		        }
            }
        }
    }
*/
});

var Web = function (Url, callback)
{
 // TODO: Should the contructor be usable? Would need tests
    var self = this;
    getWeb(Url, function getWebComplete(error, result) {
        if (error) throw error;
        this.ID = result.ID;
        this.Url = result.Url;
        this.Lists = {};
        callback(this);
    });
};

module.exports = Web;