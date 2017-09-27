var config = require('./config.global');

config.db.server = '192.168.0.2';
config.db.port = 1433;
/*config.db.options = {
	instanceName: 'MSSQL2014'
};*/

config.log = {
	appenders: {hotplace_admin: {
		type:'dateFile',
		filename: '/home/khnam/apis/onnara/logs/onnara.log',
		pattern: '-yyyy-MM-dd',
		alwaysIncludePattern: true
	}},
	categories: {default: {appenders: ['hotplace_admin'], level: 'debug'}}
};
module.exports = config;