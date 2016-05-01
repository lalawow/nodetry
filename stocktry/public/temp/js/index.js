$(document).ready(function(){
	$.getJSON('http://ipinfo.io', function(data){
  console.log(data)
  console.log(data.loc)
  var location = data.loc.split(",")
  $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139",function(weather) {
  	console.log(weather)
  })

})


})

