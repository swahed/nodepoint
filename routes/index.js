"use strict";

var express = require('express');
var router = express.Router();

//var lists = require('../routes/lists');

/* globals next */ // <!-- TODO: This Shouldn't be necessary with js-lint's node settings
router.get('/sites/:sitename', function (req, res) {
	var context = req.SPContext.Current;
	if(!context.Site) next();
    res.render('index', { title: context.Site.RootWeb.Title });
});

//router.use('/lists', lists);

module.exports = router;