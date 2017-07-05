var express  = require('express'),
    Logger   = require('../lib/logger'),
    dataUtil = require('../utils/DataUtil'), 
    db       = require('../lib/mssqlDb')();

var logger  = Logger('routes[maptype.js]'),
	router	= express.Router();

logger.setLevel('DEBUG');
router.use(function timeLog(req, res, next) {
    logger.info('Time : ', Date.now());
    next();
});


router.get('/standard', function(req, res) {
	
	res.writeHead(200, {'content-type' : 'text/plain'});
	 
	/*var sql = 'select top 100 concat(b.경도, \'□\',b.위도,\'□\', round(rand(convert(varbinary, newid()))*100, 2)) ';
	    sql+= ' from [표준공시지가].[dbo].[20170109표준지공시지가] a ';
	    sql+= 'inner join [지번주소].[dbo].[전국지번통합] b on (b.PNU=a.PNU1) ';
	    sql+= ' where (a.PNU1 like \'11%\' or a.PNU1 like \'42%\') and 위도 is not null)';*/
	
	var sql = " select top 5000 concat(b.경도, ',',b.위도) "; 
	    sql	+= " from [표준공시지가].[dbo].[20170109표준지공시지가] a";
	    sql	+= " inner join [지번주소].[dbo].[전국지번통합] b on (b.PNU=a.PNU1) ";
	    sql	+= " where (a.PNU1 like '11%' or a.PNU1 like '42%') and 위도 is not null";
	
	db.executeQuery(sql, function(err, rs) {
		console.log('err ==>' + err)
		var succ  = err ? false : true,
		    datas = err ? "" : dataUtil.makeLatLng(rs);
		
		res.write(dataUtil.makeAjaxResponse(succ, datas));
		res.end();
	});

	
});

module.exports = router;


