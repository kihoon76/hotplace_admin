/**
 * https://www.npmjs.com/package/mssql#tedious
 */

var mssql   = require('mssql'),
    Logger  = require('./logger');

var logger    = Logger('lib[mssqlDb.js]');
var db_config = require('../config/db_config_mssql.json');

logger.setLevel('DEBUG');

var config = {
	server : db_config.server,
	user : db_config.user,
	password : db_config.password,
	stream: true,
	pool : {
		max: 10,
		min: 3,
		idleTimeoutMillis: 30000
	}
};

var state = {
	pool : null
}

module.exports = function() {
	
	return {
		createPool: function(callback) {
			var cp = new mssql.ConnectionPool(config, function(err){
				if(err) {
					logger.debug(err);
				}
				else {
					state.pool = cp;
					state.pool.on('error', function(err) {
						logger.debug(err);
					});
					
					callback();
				}
			});
		},
		executeQuery : function(sql, callback) {
			
			state.pool.request().query(sql, function(err, result) {
				logger.debug('query ==> ' + sql);
				logger.debug('rowsCount ==> ' + result.rowsAffected);
				logger.debug('recordset sample ==> ' + ((result.recordset.length > 0) ? result.recordset[0] : ''));
				callback(err, result.recordset);
			});
			
			
		}
	}
}


