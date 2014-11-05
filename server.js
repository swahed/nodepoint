"use strict";

var http = require("http");
var app = require("./app");
var server;
var _portNumber;
var isRunning = false;

exports.getPortNumber = function () {
    return _portNumber;
};

exports.isRunning = function () {
    return isRunning; // TODO: Check if server object has corresponding functionlity
};

exports.start = function (portNumber, callback) {
    if (!portNumber) throw new Error("PortNumber is undefined.");
    _portNumber = portNumber;
    server = http.createServer(app);
    server.listen(_portNumber, function () {
        isRunning = true;
        callback();
    });
};

exports.stop = function (done) {
    server.close(function () {
        isRunning = false;
        done();
    });
};