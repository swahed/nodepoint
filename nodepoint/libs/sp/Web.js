"use strict";

var edge = require("edge");

var getWeb = edge.func({
    assemblyFile: '..\\nodepoint.Adpater\\bin\\Debug\\nodepoint.Adpater.dll',
    typeName: 'nodepoint.Adpater.Web',
    methodName: 'GetWeb'
});

var Web = function (Url, callback)
{
 // TODO: Should the contructor be usable? Would need tests
    var self = this;
    getWeb(Url, function getWebComplete(error, result) {
        if (error) throw error;
        this.ID = result.ID;
        this.Url = result.Url;
        this.Title = result.Title;
        this.Lists = {};
        callback(this);
    });
};

module.exports = Web;