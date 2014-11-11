"use strict";

var edge = require("edge");
var Web = require("./web");

var getSite = edge.func(function () {/*
	#r "tests_mocks\FakePoint.dll"

	using Microsoft.SharePoint;
	using System.Dynamic;

	async (input) => { 
        SPContext.Initialize("tests_mocks/FakePoint.Fakes");

		SPSite site = await Task.Run(() => // TODO: Check if this really excecutes asynchronously
        {
            var s = input as string;
            Guid id = new Guid();
            SPSite result = null;
            // TODO Add check if site exists
            try
            {
                if (Guid.TryParse(s, out id))
                    result = new SPSite(id);
                else
                    result = new SPSite(s);
            }
            catch (Exception ex)
            {
                // TODO Log error
            }

            return result;
        });

        if (site == null) return null; // TODO: Implement error handlin and logging in js instead: throw new Exception("Website was not found. Input: " + input.ToString());

        return new
        {
            Title = site.Title,
            ID = site.ID.ToString("B").ToUpper(), // TODO: move Formatting to Javascript
            Url = site.Url
        };
    }
*/
});

var Site = function (Url, callback) {
    //if(typeof callback !== "function") throw "Callback parameter is not a function"; // TODO
    //if(!url || !url.match()) TODO: Validate URL
    //	throw "Site url parameter is not a full url";
    var self = this;
    getSite(Url, function getSiteCompleted(error, site) {
        if (error) throw error;
        if(site === null) 
        {
            callback(null); // TODO: Optimize handling of non existent site. Object is not null.
            return;
        }
        
        self.Title = site.Title;
        self.ID = site.ID;
        self.Url = site.Url;
        self._ContructorUrl = Url;
        var web = new Web(site.Url, function getRootWebCompleted(web) {
            self.RootWeb = web;
            callback(self);
        });
    });
};

Site.prototype.OpenWeb = function (openUrl, callback) {
    var webUrl = openUrl;
    if (typeof webUrl === "undefined" || webUrl === null) {
        if (this._ContructorUrl === null) {
            webUrl = this.Url;
        }
        else {
            webUrl = this._ContructorUrl;
        }
    }
    
    var web = new Web(webUrl, function OpenWebComplete(web) {
        callback(web);
    });
};

module.exports = Site;