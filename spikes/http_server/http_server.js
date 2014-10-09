

var http = require("http");
var server = http.createServer();
server.on("request", function(req, res)
{
	console.log("Request received");
	res.end("<html><head></head><body>Hello darling!</body></html>");
});

server.listen("8080");

console.log("Server started");