/**
 * 
 */
var env		    = process.env.NODE_ENV || 'local';
var express   	= require('express'),
	 fs		    = require('fs'),
	 handlebars	= require('express3-handlebars'),
	 bodyParser	= require('body-parser'),
	 path		= require('path'),
	 config		= require('./lib/config.' + env),
	 log4js		= require('log4js'),
	 helmet		= require('helmet');

log4js.configure(config.log);

var app 		= express(),
   viewsPath	= path.join(__dirname, 'views'),
	logger		= log4js.getLogger('hotplace_admin');
	 
app.engine('handlebars', handlebars({
	defaultLayout : 'main',
	extname : 'handlebars',
	layoutsDir: viewsPath + '/layouts'
})); 

app.set('view engine', 'handlebars');
app.set('views', viewsPath);
app.set('port', process.env.HOTPLACE_ADMIN_PORT || 10001);
//app.disable('x-powered-by');
app.disable('etag');

app.use(express.static(path.join(__dirname, 'public/src')));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(helmet());

app.all('/*', requireLogin, function(req, res, next) {
	next();
});

app.use('/', require('./routes/index'));



/*app.use(function(err, req, res, next) {
	res.status(500).render('error');
});

app.use(function(err, req, res, next) {
	res.status(404).render('not-found');
});*/

app.listen(app.get('port'), function() {
	logger.debug('Listening on port ' + app.get('port'));
});

function requireLogin(req, res, next) {
	var path = req.path;
	if(path == '/' || path == '/login') {
		next();
	}
	else {
		res.redirect('/');
	}
	
}


