"use strict";

var http = require("http");
var server;
var portNumber = 8080;
var isRunning = false;

exports.getPortNumber = function() {
	return portNumber;
};

exports.isRunning = function(){ 
	return isRunning; // TODO: Check if server object has corresponding functionlity
};

exports.start = function(){
	server = http.createServer();
	server.on("request", function(req, res){
		res.end('Your node.js server is running on localhost:8080');
	});
	server.listen(portNumber);
	isRunning = true;
	console.log("Server started");
};

exports.stop = function(done){
	server.close(function(){
		done();
	});
};