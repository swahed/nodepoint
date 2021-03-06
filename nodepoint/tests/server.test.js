"use strict";

var server = require("../server.js");
var http = require("http");

var httpUtil = require("./testUtility.js");

var portNumber = 8080;
var testdir = "tests/_generated/";

exports.setUp = function (done) {
    server.start(portNumber, function () {
        done();
    });
};

exports.tearDown = function (done) {
    if (server.isRunning()) {
        server.stop(function () {
            done();
        });
    } else {
        done();
    }
};

exports.isCorrectPortNumber = function (test) {
    test.equal(server.getPortNumber(), portNumber);
    test.done();
};

exports.callStopTwiceThrows = function (test) {
    test.throws(function () {
        server.start();
    });
    test.done();
};

exports.isServerStartedStatusCorrect = function (test) {
    test.ok(server.isRunning());
    test.done();
};

exports.stopStopsAndCallsCallback = function (test) {
    if (server.isRunning()) {
        server.stop(function () {
            test.done();
        });
    } else {
        test.fail("Server is not running.");
        test.done();
    }
};

exports.testServerServesFiles = function (test) {
    var url = "http://localhost:" + portNumber + "/sites/teamsite";
    httpUtil.httpGetAndEndTest(url, function (error, data) {
        console.log(error);
        test.notEqual(null, data);
        test.done();
    }); 
};