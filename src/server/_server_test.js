"use strict";

var server = require("./server.js");
var http = require("http");

exports.setUp = function(done) {
    /*server.start(8080, function() {
        callback();
    });*/
	done();
};

exports.tearDown = function(done)
{
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

exports.isServerStartedStatusCorrect = function(test){
	server.start();
	test.ok(server.isRunning());
	test.done();
};

exports.testServerRespondsToRequests = function(test) {
	server.start();

	console.log("respond test started");
	var portNumber = server.getPortNumber();
	http.get("http://localhost:" + portNumber, function(res){
		res.on("data", function(){});
		test.done();
	});
	//.on('error', function(e) { // <- TODO
	//	test.fail();
	//	test.done();
	//});
};