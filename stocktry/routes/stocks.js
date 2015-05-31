var express = require('express');
var router = express.Router();

var stockDao = require('../dao/stockDao');

/* GET users listing. */
router.get('/', function(req, res, next) {
//res.send('respond with a resource');
res.render('updateStock');
});

// 增加用户
//TODO 同时支持get,post
router.get('/addStock', function(req, res, next) {
stockDao.add(req, res, next);
});

router.get('/queryAll', function(req, res, next) {
stockDao.queryAll(req, res, next);

//var samplejson3 = res.json;
var samplejson1 = [{"id":1,"name":null,"number":600760},{"id":2,"name":"haha","number":600761}];
var samplejson2 = [{"id":2,"name":"haha","number":600761}];

//console.log("sample3: "+samplejson3);
//console.log("res: "+ JSON.stringify(res));
//res.render('queryAll', {result: JSON.stringify(samplejson1)});
});

router.get('/query', function(req, res, next) {
stockDao.queryById(req, res, next);

});

router.get('/deleteStock', function(req, res, next) {
stockDao.delete(req, res, next);
});

router.post('/updateStock', function(req, res, next) {
stockDao.update(req, res, next);
});

module.exports = router;
