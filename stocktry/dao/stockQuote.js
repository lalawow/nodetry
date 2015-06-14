var request = require('request');
var async = require('async');

var stockQuote = function (number) {
	console.log("stocknumber "+ number);
    var requrl = "http://hq.sinajs.cn/list=sh"+number;

	var options = {
  		host: 'hq.sinajs.cn',
		path: '/list=sh'+number
	};

	var result;
	var resultout= 0

    		request(requrl, function(err, res, chunk) {
    			console.log(chunk);
	  			result = chunk.split(",");
	  			console.log(result[3]);
	  			console.log(result[0]);
	  			result[0] = result[0].substring(21);
	  			console.log(result[0]);
	  			resultout =1;
    		});
    		
	var interval = setInterval(function(){
		if (resultout===1) {
			console.log("quotefuncover1"+ result);
			resultout = 2;
		}
	},100);
    
    return result;

    }
    module.exports = stockQuote;



