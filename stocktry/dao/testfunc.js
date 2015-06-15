//var async = require("async");
var callback = function(){};

var testfunc = function(number) {

	var result=new Array();
	/*async.series([
		function(callback){
			console.log("first");
			for (var i = 0; i < number; i++) {
				result.push(i*2);
			}

		},
		function(callback){
			for (var i = 0; i < number; i++) {
				result.push(i*3);
			}
			
		}
		]);*/
    var s = null;
    if (s===null) console.log("s is null");
	console.log(result);
	return result;
}
module.exports = testfunc;