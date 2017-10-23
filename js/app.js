$('document').ready(function(){
    // get Location
    $.getJSON("https://ipinfo.io/", function(res){
        var locat = res.loc.split(',');
        var lon = locat[1];
        var lat = locat[0];
        var apiKey = "22f9a533752e54e33e75e81d31103466";
        // get weather info
        $.getJSON("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+apiKey+"", function(data){
            // weather Variables
            var loc = data.name;
            var fTemp = Math.round((data.main.temp) * 9/5 - 459.67);
            var highFTemp = Math.round((data.main.temp_max) * 9/5 - 459.67);
            var lowFTemp = Math.round((data.main.temp_min) * 9/5 - 459.67);
            var cTemp = Math.round((data.main.temp) - 275.13);
            var highCTemp = Math.round((data.main.temp_max) - 275.13);
            var lowCTemp = Math.round((data.main.temp_min) - 275.13);
            var conditions = data.weather[0].main;
            var wind = Math.round(data.wind.speed * 2.2369);
            var humidity = data.main.humidity;
            var pressure = data.main.pressure;

            // content that doesn't require a conditional
            $("#location").html(loc);
            $('#temp').html(''+fTemp+'&deg;F');
            $('#htemp').html(''+highFTemp+'&deg;F');
            $('#ltemp').html(''+lowFTemp+'&deg;F');
            $("#conditions").html(conditions);
            $("#wind").html(wind);
            $("#humidity").html(humidity);
            $('#pressure').html(''+pressure+' hPa');

            // Switch Control 
            var tempChange = true;
            $('#switch').click(function(){
                if (tempChange === false){
                    $('#temp').html(''+fTemp+'&deg;F');
                    $('#htemp').html(''+highFTemp+'&deg;F');
                    $('#ltemp').html(''+lowFTemp+'&deg;F');
                    tempChange = true;
                } else {
                    $('#temp').html(''+cTemp+'&deg;C');
                    $('#htemp').html(''+highCTemp+'&deg;C');
                    $('#ltemp').html(''+lowCTemp+'&deg;C');
                    tempChange = false;
                }
            });

            // Change Background
            var weatherId = data.weather[0].id;
            if (weatherId < 299) {
                $("#landing").css("background-image", "url(\"../img/thunder.jpg\")");
            } else if (weatherId > 300 &&  weatherId < 499) {
                $("#landing").css("background-image", "url(\"../img/lightrain.jpg\")");
            } else if (weatherId > 500 &&  weatherId < 599) {
                $("#landing").css("background-image", "url(\"../img/rainy.jpg\")");
            } else if (weatherId > 600 &&  weatherId < 699) {
                $("#landing").css("background-image", "url(\"../img/snow.jpg\")");
            } else if (weatherId > 700 &&  weatherId < 799) {
                $("#landing").css("background-image", "url(\"../img/fog.jpg\")");
            } else if (weatherId === 800) {
                $("#landing").css("background-image", "url(\"../img/sunny.jpg\")");
            } else if (weatherId >= 801 &&  weatherId < 899) {
                $("#landing").css("background-image", "url(\"../img/overcast.jpg\")");
            } else if (weatherId >= 900 &&  weatherId < 907) {
                $("#landing").css("background-image", "url(\"../img/storm.jpg\")");
            } else if (weatherId > 908) {
                $("#landing").css("background-image", "url(\"../img/partlycloudy.jpg\")");
            } 
        })
    });
});