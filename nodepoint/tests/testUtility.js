"use strict";

var http = require('http');

exports.httpGetAndEndTest = function(url, callback, expextedstatuscode) {
	var request = http.get(url);

    if (!expextedstatuscode || expextedstatuscode === null)
        expextedstatuscode = 200;

	request.on('error', function (e) {
        var error = "Http (" + url + ") request failed with error: " + e;
        callback(error, null, null);
    });

	request.on("response", function (res) {
        var hasReceivedData = false,
            data = "",
            error ="";

        res.on("data", function (chunk) {
            hasReceivedData = true;
            data += chunk;
        });

        res.on("end", function () {
            if (!hasReceivedData)
                error = "Http request did not return data";
            else if (res.statusCode !== expextedstatuscode)
                error = "Wrong http Status. " +
        	        "Expected: " + expextedstatuscode +
        	        "Received: " + res.statusCode;
            
            if (data === "") data = null;
            
            callback(error, data, res);
        });
    });
}


exports.getTitle = function(html){
    var re = /(<\s*title[^>]*>(.+?)<\s*\/\s*title)>/gi; // TODO: Improve method to extract title
    var match = re.exec(html);
    if (!match || match.length < 3) return "";
    else return match[2];
}