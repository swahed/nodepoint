// Demonstrates how to serve a static file

"use strict";

var http = require("http");
var fs = require("fs");
var server = http.createServer();

server.on("request", function(req, res) {
	fs.readFile("./http_serveFile.html", function(err, data){
		if(err) throw err;
		res.end(data);
	});
});

server.listen("8080");

console.log("Server started");