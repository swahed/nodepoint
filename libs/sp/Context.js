"use strict";

var Site = require("./site");

// TODO: This might be better suited for the routes directory
module.exports = function(req, res, next) {
	// TODO: Check if url is valid otherwise create empty Context (Do not throw but fallthrough to 404 page)
	req.SPContext = {};
	req.SPContext.Current = {};	// TODO: Current is a fragment from the use of a server side singleton and might not be necessary in this singlethread application
	req.SPContext.Current.Site = new Site("http://localhost" + req.originalUrl, function(site){ // TODO: Need to find a way to map ports other then hard coding
	 	if(site === null) req.SPContext.Current.Site = null; // TODO: Currenly necessary because consrtuctor cannot return null and site is loaded asynchronously. To be imporved.
	 	next();
	});
};