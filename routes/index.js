"use strict";

var express = require('express');
var router = express.Router();

//var lists = require('../routes/lists');

router.get('/sites/:sitename', function (req, res, next) {
	var context = req.SPContext.Current;
	if(!context.Site) 
	{
		next();
		return;
	}
    res.render('index', { title: context.Site.RootWeb.Title });
});

//router.use('/lists', lists);

module.exports = router;