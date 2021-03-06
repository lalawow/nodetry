// dao/userDao.js
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./stockSqlMapping');
var stockQuote = require('./stockQuote');
var qhttp = require('q-io/http');
var StringDecoder = require('string_decoder').StringDecoder;

var iconv = require('iconv-lite');
iconv.extendNodeEncodings();

var decoder = new StringDecoder('utf8');


var testfunc = require('./testfunc');

// 使用连接池，提升性能
var pool  = mysql.createPool($util.extend({}, $conf.mysql));

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code:'1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

module.exports = {
    add: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;

            // 建立连接，向表中插入值
            // 'INSERT INTO user(id, name, number) VALUES(0,?,?)',
            connection.query($sql.insert, [param.name, param.number], function(err, result) {
                if(result) {
                    result = {
                        code: 200,
                        msg:'增加成功'
                    };    
                }

                // 以json形式，把操作结果返回给前台页面
                jsonWrite(res, result);

                // 释放连接 
                connection.release();
            });
        });
    },
    delete: function (req, res, next) {
        // delete by Id
        pool.getConnection(function(err, connection) {
            var id = +req.query.id;
            connection.query($sql.delete, id, function(err, result) {
                if(result.affectedRows > 0) {
                    result = {
                        code: 200,
                        msg:'删除成功'
                    };
                } else {
                    result = void 0;
                }
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    update: function (req, res, next) {
        // update by id
        // 为了简单，要求同时传name和age两个参数
        var param = req.body;
        if(param.name == null || param.number == null || param.id == null) {
            jsonWrite(res, undefined);
            return;
        }

        pool.getConnection(function(err, connection) {
            connection.query($sql.update, [param.name, param.number, +param.id], function(err, result) {
                // 使用页面进行跳转提示
                if(result.affectedRows > 0) {
                    res.render('suc', {
                        result: result
                    }); // 第二个参数可以直接在jade中使用
                } else {
                    res.render('fail',  {
                        result: result
                    });
                }

                connection.release();
            });
        });

    },
    queryById: function (req, res, next) {
        var id = +req.query.id; // 为了拼凑正确的sql语句，这里要转下整数
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryById, id, function(err, result) {
                jsonWrite(res, result);
                connection.release();

            });
        });
    },
    queryAll: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryAll, function(err, result) {
                //jsonWrite(res, result);
                console.log("DAO "+ JSON.stringify(result));
                res.render("queryAll", {results: result});
                //console.log("DAO2 "+JSON.stringify(res));
                connection.release();
            });
        });
    },
    queryPlay: function (req, res, next) {
        var stocks = [{"id":1, "name":"OKEY", "number":"600760"}, {"id":2, "name":"STAR", "number":"600761"}];
        var result = new Array();
        for (var stock in stocks) {
            console.log(stocks[stock]);
            console.log(stocks[stock].number);
            var sQuote = null;
            
             /*   function(){
                    sQuote = stockQuote(stocks[stock].number);
                    
                },
                function(){ 
                    console.log('quoteover');
                    console.log("readQuote: "+ sQuote);
                    var sQuoteResult = {
                    "id": stock.id,
                    "number": stock.number,
                    "name": sQuote[0],
                    "currentPrice": sQuote[3]
                    }
                    result.append(sQuoteResult);
                }
            ]);*/
           
            sQuote = stockQuote(stocks[stock].number);

           //if (sQuote === null) console.log("sQuote is NaN");
            setTimeout(function(){
                var value = JSON.parse(sQuote).value;
                console.log("readQuote: ", value);
                var sQuoteResult = {
                "id": stock.id,
                "number": stock.number,
                "name": value[0],
                "currentPrice": value[3]
                };
                console.log("new Quote", sQuoteResult);
                result.push(sQuoteResult);
           },500);
            
            /*console.log("readQuote: "+sQuote);
            var sQuoteResult = {
                "id": stock.id,
                "number": stock.number,
                "name": sQuote[0],
                "currentPrice": sQuote[3]
            }
            result.append(sQuoteResult);*/
        }
        setTimeout(function(){
            console.log("queryorder"+result[1]);
            res.render("queryAll", {results: result});
        },1000);

    },
    queryPlay2: function(req,res,next) {
        var stocks = [{"id":1, "name":"ZHHB", "number":"600760"}, {"id":2, "name":"ANHL", "number":"600761"}];
        var result = [];
        for (var stock in stocks) {
            var num = stocks[stock].number;
            console.log(stocks[stock]);
            console.log(num);
            var squoteres;
            var sQuoteResult = {
                "id": stocks[stock].id,
                "number": stocks[stock].number,
                "name": null,
                "currentPrice": null
                };
            var pes = {
                "id": stocks[stock].id,
                "number": stocks[stock].number
            }
            var requrl = "http://hq.sinajs.cn/list=sh"+num;
            qhttp.read(requrl)
            .then(function (ch) {
//                   console.log("stringlise "+ ch);
//                    var chunk = new String();
//                    chunk = "ok"+ch;
                    var chunk = iconv.decode(ch,"gbk");
                    console.log(ch);
                    console.log(chunk);
                    squoteres = chunk.split(",");
                    console.log("中文试试 "+squoteres);
                    console.log(squoteres[3]);
                    console.log(squoteres[0]);
                    squoteres[0] = squoteres[0].substring(21);
                    console.log(squoteres[0]);
                    sQuoteResult.name = squoteres[0];
                    sQuoteResult.currentPrice = squoteres[3];
                    pes.name = squoteres[0]
                    pes.currentPrice = squoteres[3]
                    console.log("new Pes", pes)
                    return pes
                    //result.push(sQuoteResult);
            }).then(function(pp){
                  result.push(pes);
                  console.log("new Quote", result);
            })        
        }
        setTimeout(function(){
            console.log("total result", result);
            res.render("queryAll", {results: result});
        },500);
    },
    queryPlay3: function(req,res,next) {
        var a = testfunc(12);
        console.log(a);
    },
    queryPlay4: function(req,res,next) {
        var stocks = [{"id":1, "name":"ZHHB", "number":"600760"}, {"id":2, "name":"ANHL", "number":"600761"}];
        var result = [];
        var result_chunk = [];
        for (var stock in stocks) {
            var num = stocks[stock].number;
            console.log(stocks[stock]);
            console.log(num);
            var squoteres;
            var sQuoteResult = {
                "id": stocks[stock].id,
                "number": stocks[stock].number,
                "name": null,
                "currentPrice": null
                };
            var pes = {
                "id": stocks[stock].id,
                "number": stocks[stock].number
            }
            var requrl = "http://hq.sinajs.cn/list=sh"+num;
            qhttp.read(requrl)
            .then(function (ch) {
//                   console.log("stringlise "+ ch);
//                    var chunk = new String();
//                    chunk = "ok"+ch;
                    var chunk = iconv.decode(ch,"gbk");
                    result_chunk.push(chunk);
                    console.log("chunk pile: ", result_chunk);
/*                    console.log(ch);
                    console.log(chunk);
                    squoteres = chunk.split(",");
                    console.log("中文试试 "+squoteres);
                    console.log(squoteres[3]);
                    console.log(squoteres[0]);
                    squoteres[0] = squoteres[0].substring(21);
                    console.log(squoteres[0]);
                    sQuoteResult.name = squoteres[0];
                    sQuoteResult.currentPrice = squoteres[3];
                    pes.name = squoteres[0]
                    pes.currentPrice = squoteres[3]
                    console.log("new Pes", pes)
                    return pes
                    //result.push(sQuoteResult);
            }).then(function(pp){
                  result.push(pes);
                  console.log("new Quote", result); */
            })        
        }
        setTimeout(function(){
            console.log("total chunk", result_chunk);
//            console.log("total result", result);
            var post_chunk;
            post_chunk = build_result(result_chunk);
            res.render("queryAll", {results: post_chunk});
        },500);
    },

};

var build_result = function(chunks) {
    var n = 0
    var res = []
    console.log(chunks, "chunks", chunks.length)
    for (var i = 0; i < chunks.length; i++) {
        var chunk = chunks[i]
        console.log(i,"chunk", chunk)
        var squoteres = chunk.split(",");
        var pes = {}
        console.log("中文试试 "+squoteres);
        console.log(squoteres[3]);
        console.log(squoteres[0]);
        squoteres[0] = squoteres[0].substring(21);
        console.log(squoteres[0]);

        pes.name = squoteres[0]
        pes.currentPrice = squoteres[3]
        n++
        pes.id = n
        console.log("pes: ",pes)
        res.push(pes)

            }
    console.log(n)
    return res
}