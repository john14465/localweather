$('document').ready(function(){
    // variables
    var lon;
    var lat;
    var loc;
    var ftemp;
    var ctemp;
    var conditions;
    var wind;
    var humidity;
    var apiKey = "22f9a533752e54e33e75e81d31103466";
    // get Location
    $.getJSON("http://ip-api.com/json", function(res){
        var lon = res.lon;
        var lat = res.lat;
        // get weather info
        $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+apiKey+"", function(data){
            var loc = data.name;
            var ftemp = Math.round((data.main.temp) * 9/5 - 459.67);
            var ctemp = Math.round((data.main.temp) - 275.13);
            var conditions = data.weather[0].main;
            var wind = Math.round(data.wind.speed * 2.2369);
            var humidity = data.main.humidity;

            $("#location").html(loc);
            $("#ftemp").html(ftemp);
            $("#ctemp").html(ctemp);
            $("#conditions").html(conditions);
            $("#wind").html(wind);
            $("#humidity").html(humidity);

            if (data.weather[0].main == "Rain") {
                $("#landing").css("background-image", "url(\"../img/rainy.jpg\")");
            }
        })
    });
});