var config = require('./config.global');

config.log = {
	appenders: {hotplace_admin: {type:'console'}},
	categories: {default: {appenders: ['hotplace_admin'], level: 'debug'}}
};
module.exports = config;