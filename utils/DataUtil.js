var log4js  = require('log4js'),
	util 	= require('util');

var logger   = log4js.getLogger('DataUtil.js');
var DataUtil = function() {
	var AJAX_FORMS = '{"success" : %s, "datas" : %s}';
	
	return {
		makeLatLng : function(arr) {
			var r = '[';
			
			if(arr) {
				var len = arr.length;
				for(var i = 0; i < len; i++) {
					r += '[' + arr[i][''] + '],';
				}
				
				r = r.substring(0, r.length - 1);
			}
			
			r += ']';
			
			return r;
		},
		makeAjaxResponse: function(succ,  datas) {
			return util.format(AJAX_FORMS, succ, datas);
		}
	}
}

module.exports = DataUtil();

