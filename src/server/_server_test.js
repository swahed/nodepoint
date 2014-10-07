"use strict";

var server = require("./server.js");

/*global test*/
exports.testNothing = function(test){
	test.equals(3, server.number(), "number function");
	test.done();
};