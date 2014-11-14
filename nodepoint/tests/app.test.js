"use strict";

var server = require("../server.js");
var http = require("http");
var fs = require("fs");

var httpUtil = require("./testUtility.js");

var portNumber = 8080;
var testdir = "tests/_generated/";

var testSiteUrl = "http://localhost/sites/teamsite";
var testSubWebUrl = "http://localhost/sites/teamsite/subsite";
var testSiteUrl2 = "http://localhost/sites/anotherteamsite";

var testSiteRequestUrl = "http://localhost:" + portNumber + "/sites/teamsite"; // TODO: How to map the port nimber?
var testSubRequestWebUrl = "http://localhost:" + portNumber + "/sites/teamsite/subsite"; // TODO: How to map the port nimber?
var testSiteRequestUrl2 = "http://localhost:" + portNumber + "/sites/anotherteamsite"; // TODO: How to map the port nimber?
var testNonExistentSiteRequestUrl = "http://localhost:" + portNumber + "/nonexsistenturl";
var testNonExistentSiteRequestUrl2 = "http://localhost:" + portNumber + "/sites/nonexsistenturl";

var testRootWebTitle = "Teamsite Rootweb";
var testSubWebTitle = "Teamsite Subweb";
var testRootWebTitle2 = "Teamsite 2 Rootweb";
var testSubWebTitle2 = "Teamsite Subweb 2";

exports.setUp = function (done) {
    // Creates a folder to store test files
    if(fs.existsSync(testdir)) rmDir(testdir);
    fs.mkdirSync(testdir);

    server.start(portNumber, function () {
        done();
    });
};

exports.tearDown = function (done) {
    // Remove folder with test files
    rmDir(testdir);

    if (server.isRunning()) {
        server.stop(function () {
            done();
        });
    } else {
        done();
    }
};

exports.testServerServes404Page = function (test) {
    httpUtil.httpGetAndEndTest(testNonExistentSiteRequestUrl, function(){
        httpUtil.httpGetAndEndTest(testNonExistentSiteRequestUrl2, function(){
            test.done();
        }, 404);
    }, 404);
};

 exports.testServesCorrectSite = function(test){ // TODO: Setup dedicated test files for routes since this is acttually a test of routes/index.js. Currently this tests to many things at once.
 	httpUtil.httpGetAndEndTest(testSiteRequestUrl, function (err, result) {
         var title = httpUtil.getTitle(result);
         test.equal(title, testRootWebTitle, "Did not receive correct title for teamsite.");

        httpUtil.httpGetAndEndTest(testSiteRequestUrl2, function (err, result) {
             var title = httpUtil.getTitle(result);
             test.equal(title, testRootWebTitle2, "Did not receive correct title for teamsite.");
            
             test.done();
         });
     });
 };


// TODO: 
/*exports.test_serverServesAFile = function (test) {
    var testfile = testdir + "test.html";
    try {
        fs.writeFileSync(testfile, "hello World");
    } finally {
        test.done();
    }
	
};*/

var rmDir = function(dirPath) {
    try { var files = fs.readdirSync(dirPath); }
    catch(e) { return; }
    if (files.length > 0)
        for (var i = 0; i < files.length; i++) {
          var filePath = dirPath + '/' + files[i];
          if (fs.statSync(filePath).isFile())
            fs.unlinkSync(filePath);
          else
            rmDir(filePath);
        }
    fs.rmdirSync(dirPath);
};