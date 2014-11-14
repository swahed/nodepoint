"use strict";

var edge = require("edge");
var Web = require("./web");

var getSite = edge.func({
    assemblyFile: '..\\nodepoint.Adpater\\bin\\Debug\\nodepoint.Adpater.dll',
    typeName: 'nodepoint.Adpater.Site',
    methodName: 'GetSite'
});

var Site = function (Url, callback) {
    //if(typeof callback !== "function") throw "Callback parameter is not a function"; // TODO
    //if(!url || !url.match()) TODO: Validate URL
    //	throw "Site url parameter is not a full url";
    var self = this;
    self.isNull = function () { return (typeof self.ID === 'undefined'); }; // TODO: Getter // TODO: Site === null possible?
    getSite(Url, function getSiteCompleted(error, site) {
        if (error) throw error;
        if(site === null) 
        {
            callback(); // TODO: Optimize handling of non existent site. Object is not null.
            return;
        }
        
        self.Title = site.Title;
        self.ID = site.ID;
        self.Url = site.Url;
        self._ContructorUrl = Url;
        self.RootWeb = new Web(site.Url, function getRootWebCompleted() {
            callback();
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
    
    var web = new Web(webUrl, function OpenWebComplete() {
        callback();
    });

    return web;
};

module.exports = Site;