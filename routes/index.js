var express = require('express'),
    Logger  = require('../lib/logger.js');

var logger  = Logger('routes[index.js]'),
	router	= express.Router();


logger.setLevel('DEBUG');
router.use(function timeLog(req, res, next) {
    logger.info('Time : ', Date.now());
    next();
});

router.get('/' , function(req, res) {
	res.render('index', { title: 'Express' });
});

module.exports = router;
