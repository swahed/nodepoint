"use strict";

var server = require("./server.js");
var http = require("http");

exports.setUp = function(done) {
    server.start(8080, function() {
        done();
    });
};

exports.tearDown = function(done) {
	//TODO: Check if started
	if(server.isRunning()) {
		server.stop(function(){
			done();
		});
	} else {
		done();
	}
};

exports.isCorrectPortNumber = function(test){
	test.equal(server.getPortNumber(), 8080);
	test.done();
};

exports.callStopTwiceThrows = function(test){
	test.throws(function(){
		server.start();
	});
	test.done();
};

exports.isServerStartedStatusCorrect = function(test){
	test.ok(server.isRunning());
	test.done();
};

exports.testServerRespondsHelloWorld = function(test) {
	var portNumber = server.getPortNumber();
	http.get("http://localhost:" + portNumber, function(res){
		test.equal(res.statusCode, 200);
		var receivedData = false;
		res.on("data", function(chunk){
			receivedData = true;
			test.equal(chunk, "Hello World");
		});
		res.on("end", function(){
			test.equal(receivedData, true);
			test.done();
		});		
	}).on('error', function(e) { // <- TODO
		test.fail();
		test.done();
	});
};

exports.stopStopsAndCallsCallback = function(test){
	if(server.isRunning()) {
		server.stop(function(){
			test.done();
		});
	}else{
		test.fail("Server is not running.");
	}
};

exports.callStopTwiceThrows = function(test){
	test.throws(function(){
		server.stop();
		server.stop();
	});
	test.done();
};
