var express = require('express')
   ,http = require('http')
   ,fs = require('fs')
   ,handlebars = require('express3-handlebars')
   ,bodyParser = require('body-parser')
   ,path = require('path')
   ,MssqlDb = require('./lib/mssqlDb')
   ,Logger = require('./lib/logger');


var app = express(),
	viewsPath = path.join(__dirname, 'views'),
	logger = Logger('./lib/logger'),
	mssqlDb = MssqlDb();

logger.setLevel('DEBUG');

app.engine('handlebars', handlebars({
	 //defaultLayout : 'main'
	layoutsDir : viewsPath + '/layouts'
}));

app.set('view engine', 'handlebars');
app.set('views', viewsPath);
app.set('port', process.env.PORT || 8000);


app.disable('x-powered-by');
app.disable('etag');

app.use(express.static(path.join(__dirname, 'public/src')));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


// connect the pool and start the web server when done
mssqlDb.createPool(function() {
	app.use('/maptype', require('./routes/maptype'));
	app.use('/', require('./routes/index'));
	
	app.listen(app.get('port'), function() {
		console.log('Listening on port ' + app.get('port'));
	});
});






/*app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500).render('error');
});

app.use(function(req, res) {
	res.status(404).render('not-found');
});
*/

