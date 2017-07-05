/**
 * http://usejsdoc.org/
 */

var mysql = require('mysql');
var db_config = require('../config/db_config_mysql.json');

var state = {
	connection : null
}

function done() {
	
}

exports.query = function(sql, callback) {
	
	if(state.connection) {
		return done();
	}
	
	state.connection = mysql.createConnection({
		host : db_config.host,
		user : db_config.user,
		password : db_config.password,
		port : 3306,
		database : db_config.database
	});
	
	state.connection.connect();
	
	state.connection.query(sql, function(err, rows, fields) {
		if(!err) {
			callback(rows, fields);
		}
		else {
			console.log('err : ', err);
		}
	});
	
	state.connection.end();
	state.connection = null;
}
