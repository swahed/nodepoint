"use strict";

var server = require("../server.js");
var http = require("http");
var fs = require("fs");

exports.setUp = function (done) {
    server.start(8080, function () {
        done();
    });
};

exports.tearDown = function (done) {
    //TODO: Check if started
    if (server.isRunning()) {
        server.stop(function () {
            done();
        });
    } else {
        done();
    }
};

exports.isCorrectPortNumber = function (test) {
    test.equal(server.getPortNumber(), 8080);
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

exports.testServerRespondsHelloWorld = function (test) {
    var portNumber = server.getPortNumber();
    http.get("http://localhost:" + portNumber, function (res) {
        test.equal(res.statusCode, 200);
        var receivedData = false;
        res.on("data", function (chunk) {
            receivedData = true;
            test.notEqual(chunk, null); // <-- TODO: Check result output
        });
        res.on("end", function () {
            test.equal(receivedData, true);
            test.done();
        });
    }).on('error', function (e) {
        // <- TODO
            test.fail();
            test.done();
        });
};

exports.test_serverServesfile = function (test) {
    var testdir = "tests/_generated/test"; // TODO: Create directory here or have grunt create it and delete it afterwars
    var testfile = testdir + "test.html";
    try {
        fs.writeFileSync(testfile, "hello World");
        test.done();
    } finally {
        fs.unlinkSync(testfile);
        test.ok(!fs.existsSync(testfile), "test file should have been deleted");
    }
	
};

exports.stopStopsAndCallsCallback = function (test) {
    if (server.isRunning()) {
        server.stop(function () {
            test.done();
        });
    } else {
        test.fail("Server is not running.");
    }
};

/*exports.callStopTwiceThrows = function(test){
	test.throws(function(){
		_server.stop();
		_server.stop();
	});
	test.done(); // TODO: This seems to tear down before throw function is called
};*/
