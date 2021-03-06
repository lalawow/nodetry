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
//stockDao.queryAll(req, res, next);

//var samplejson3 = res.json;
var samplejson1 = [{"id":1,"name":null,"number":600760},{"id":2,"name":"haha","number":600761}];
var samplejson2 = [{"id":2,"name":"haha","number":600761}];

//console.log("sample3: "+samplejson3);
console.log("res: "+ JSON.stringify(samplejson1));
res.render('queryAll', {results: samplejson1});

});

router.get('/queryPlay', function(req, res, next) {
stockDao.queryPlay(req, res, next);
});

router.get('/queryPlay2', function(req, res, next) {
stockDao.queryPlay2(req, res, next);
});

router.get('/queryPlay4', function(req, res, next) {
stockDao.queryPlay4(req, res, next);
});

router.get('/queryPlay5', function(req, res, next) {
stockDao.queryPlay5(req, res, next);
});

router.get('/queryPlay6', function(req, res, next) {
stockDao.queryPlay6(req, res, next);
});


// /stocks/queryplay7/addStock=:stock
router.get('/queryplay7/addStock=:stock_number', function(req, res, next) {
stockDao.addStock(req.params.stock_number,res)
});

// /stocks/queryplay7/deleteStock=:stock
router.get('/queryplay7/deleteStock=:stock_number', function(req, res, next) {
stockDao.deleteStock(req.params.stock_number,res)
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
