"use strict";

var http = require('http');

exports.httpGetAndEndTest = function(test, url, dataCallback, endCallback) {
    http.get(url, function (res) {
        test.equal(res.statusCode, 200, "Http Status not 200.");
        var receivedData = false;
        res.on("data", function (chunk) {
            receivedData = true;
            if (dataCallback) dataCallback(chunk.toString()); // TODO: Collect chunks
        });
        res.on("end", function () {
            test.equal(receivedData, true, "Http Request did not return data");
            if (endCallback) endCallback();
            else test.done();
        });
    }).on('error', function (e) {  // <- TODO
        test.fail("Http (" + url + ") request failed with error: " + e);
        test.done();
    });
}

exports.httpGetAndExpect404Page = function(test, url, endCallback) {
    http.get(url, function (res) {
        test.equal(res.statusCode, 404, "Http Status not 404.");
        var receivedData = false;
        res.on("data", function (chunk) {
            receivedData = true;
        });
        res.on("end", function () {
            test.equal(receivedData, true, "Http Request did not return data"); // TODO: Check if this is 404 page
            if (endCallback) endCallback();
            else test.done();
        });
    }).on('error', function (e) {  // <- TODO
        test.fail("Http (" + url + ") request failed with error: " + e);
        test.done();
    });
}