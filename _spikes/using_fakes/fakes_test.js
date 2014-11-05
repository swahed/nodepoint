var edge = require("edge");

var getSPSite = edge.func(function(){/*
	#r "FakePoint.dll"
	
	using Microsoft.SharePoint;
	using System.Dynamic;

	async (input) => { 
		var site = SPContext.Current.Site;

		return new {
			ID = site.ID,
			Url = site.Url
		};
    }
*/});

function SPSite(Url, callback) {
	var self = this;
	getSPSite(Url, function(error, site){
		if(error) throw error;
		
	    setTimeout(function()
        {
	        self.ID = site.ID;
			self.Url = site.Url; 
			callback();
        }, 3000);

	});
}


var site = new SPSite("http://localhost/sites/teamsite", function(){
	console.log(site.Url);
});


var using = {};
using.newSPSite = function (Url, callback) {
	var site = SPSite(Url, function(){
		callback(site);
	});
};

// Variations:
// Galaxy uses genrators instead of callback 
// https://github.com/bjouhier/galaxy
// var myObj = (yield galaxy.new(MyClass)("obj1"));
// console.log(myObj.name);

// Bluebird.js Promises library supports using pattern
// https://github.com/petkaantonov/bluebird/blob/master/API.md#promiseusingpromisedisposer-promise-promisedisposer-promise--function-handler---promise
// using(getConnection(), function(conn1) {
//    return using(getConnection(), function(conn2) {
//        // use conn1 and conn 2 here
//    });
// }).then(function() {
//    // Both connections closed by now
// })