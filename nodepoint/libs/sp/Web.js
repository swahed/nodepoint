"use strict";

var edge = require("edge");

var getWeb = edge.func({
    assemblyFile: '..\\nodepoint.Adpater\\bin\\Debug\\nodepoint.Adpater.dll',
    typeName: 'nodepoint.Adpater.Web',
    methodName: 'GetWeb'
});

var Web = function (Url, callback) {  // TODO: Should the contructor be usable? Would need tests
    //if(typeof callback !== "function") throw "Callback parameter is not a function"; // TODO
    //if(!url || !url.match()) TODO: Validate URL
    //	throw "Site url parameter is not a full url";
    var self = this;
    getWeb(Url, function getWebComplete(error, web) {
        if (error) throw error;
        if (web === null) {
            callback(null); // TODO: Optimize handling of non existent site. Object is not null.
            return;
        }
        
        self.ID = web.ID;
        self.Url = web.Url;
        self.Title = web.Title;
        self.Lists = [];
        callback();
    });
};

module.exports = Web;