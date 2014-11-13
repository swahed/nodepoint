"use strict";

var SP = require("../../libs/sp/SharePoint");

exports.SPSiteModuleExportsFunction = function(test){
    test.equal(SP.Site !== null, true, "Exported object is null.");
    test.equal(typeof SP.Site, "function", "Exported object is not a function.");
    test.done();
};

exports.SPWebModuleExportsFunction = function(test){
    test.equal(SP.Web !== null, true, "Exported object is null.");
    test.equal(typeof SP.Web, "function", "Exported object is not a function.");
    test.done();
};