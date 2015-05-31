var express = require('express');
var router = express.Router();

var stockDao = require('../dao/stockDao');

router.get('/', function(req, res, next) {
//res.send('respond with a resource');
res.render('index');
stockDao.queryAll(req, result, next);

});

module.exports = router;