$(document).ready(function () {
    var nodes = $(".change")
    nodes.each(function() {
    	if ($(this).text().substr(0,1)==='-') $(this).addClass('greenFont') 
    		else $(this).addClass('redFont') 
    })
});