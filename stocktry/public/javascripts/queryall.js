$(document).ready(function () {
	pricecolor(".change")
	pricecolor(".dev")
});

var pricecolor = function(price_class) {
	var nodes = $(price_class)
    nodes.each(function() {
    	if ($(this).text().substr(0,1)==='-') $(this).addClass('greenFont') 
    		else $(this).addClass('redFont') 
    })
}