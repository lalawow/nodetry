var qhttp = require('q-io/http');

var stockQuote = function (number) {
	console.log("stocknumber "+ number);
    var requrl = "http://hq.sinajs.cn/list=sh"+number;
    var result;

	qhttp.read(requrl)
	.then(function (ch) {
  		console.log("stringlise "+ ch);
  		var chunk = new String();
  		chunk = "ok"+ch;

  		console.log(chunk);

	  	result = chunk.split(",");
	  	console.log("split chunk "+result);
	  	console.log(result[3]);
	  	console.log(result[0]);
	  	result[0] = result[0].substring(23);
	  	console.log(result[0]);
	});
	console.log("return result "+ result[3]);
	return result;
}
    
module.exports = stockQuote;



