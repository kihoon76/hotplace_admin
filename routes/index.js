var express    = require('express'),
	log4js	   = require('log4js'),
	dataUtil   = require('../utils/DataUtil')
	db         = require('../lib/mssqlDb')();

var router     = express.Router();
var logger	   = log4js.getLogger('index.js');

router.use(function preProcess(req, res, next) {
	logger.debug('요청 URL : ', req.originalUrl);
	logger.debug('요청 METHOD : ', req.method);

	if(req.method == 'GET') {
		logger.debug('파라미터  query : ', req.query);
	}
	else {
		logger.debug('파라미터 params: ', req.body);
	}

	next();
});

router.get('/', function(req, res) {
	res.render('login');
});

router.post('/login', function(req, res) {
	var id = req.body.id;
	var pw = req.body.pw;
	var sess;
	
	if(id == 'test' && pw == '1') {
		sess = req.session;
		sess.username = 'test';
		res.send(dataUtil.makeAjaxResponse(true, '""'));
	}
	else {
		res.send(dataUtil.makeAjaxResponse(false, '""'));
	}
});

router.get('/logout', function(req, res) {
	req.session.destroy(function(err) {
		if(err) {
			logger.error('logout error : ' + err);
			res.send(dataUtil.makeAjaxResponse(false, '""'));
		}
		else {
			res.send(dataUtil.makeAjaxResponse(true, '""'));
		}
		
	});
});

router.get('/index', function(req, res) {
	res.render('index');
});

router.get('/api/onnara/pnucode', function(req, res) {
	db.getPnuCode('[데이터수집].[dbo].[SEL_온나라수집PNU_고유번호]', req, res);
});

router.post('/api/onnara', function(req, res) {
	db.setProcedure('[데이터수집].[dbo].' + req.body.p_nm, req, res);
});

module.exports = router;