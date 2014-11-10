"use strict";

var express = require('express');
var router = express.Router();

var lists = require('../routes/lists');

router.get('/sites/:sitename', function (req, res) {
	context = req.SPContext;
	if(!context.Site) next();
    res.render('index', { title: context.Site.Title });
});

router.use('/lists', lists);

module.exports = router;