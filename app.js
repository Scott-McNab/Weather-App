
function getLocation() {

	var location = document.getElementById("location").value;

	location = location.replace(" ", "%20");

	if (location == "") {

		document.getElementById("location").classList.add("error");

	}
	else {

		document.getElementById("location").classList.remove("error");
		getWeather(location);

	}
}

function getWeather(location){


	var ajax = new XMLHttpRequest();

	var json;


	var apiKEY = "3521a940efd69dc5b6f3dd982d18c618";


	var url = "http://api.openweathermap.org/data/2.5/weather?q=" + location + " ,uk&appid=" + apiKEY;


	ajax.open("GET", url, true);


	ajax.send();


	ajax.onreadystatechange = function(){


		if (ajax.readyState == 4 && ajax.status == 200){


			json = JSON.parse(ajax.responseText);


			document.getElementById("locationForm").style.display = "none";
			document.getElementById("weather").style.display = "block";


			if (json != undefined) {
	    showWeatherInfo(json)
        
        var weather = json.weather[0].main
        setIconAndDescription(weather, location)
        
	}
			else {

				description = "Oops, I couldn't find the weather in " + location;
				document.getElementById("description").innerHTML = description;

			}
		}
	}
}



function showWeatherInfo(weatherInfo, location) {
    var weather = weatherInfo.weather[0].main.toLowerCase(),
			// Here is were do the maths to change the temperature to celsius instead of kelvin
				// It took me a while. This is just finding the temperature from the main weatherInfo and subtracting "273.15"
        temperature = Math.round((weatherInfo.main.temp) - 273.15);


    if (weather == "clear sky" || weather == "clear") {
        icon = "clear.svg";
        description = "Yay, sunshine!";
				document.body.style.backgroundColor = "#E4C107";
		    
		    

    } else if (weather == "few clouds") {
        icon = "few-clouds.svg";
        description = "It's a little cloudy.";
				document.body.style.backgroundColor = "#D0D0D0";
    
        
        
    } else if (weather == "mist") {
        icon = "mist.svg";
        description = "Looks a little misty today.";
				document.body.style.backgroundColor = "#DDDDDD";
				
				
        
    } else if (weather == "fog" || weather == "haze") {
        icon = "mist.svg";
        description = "Looks a bit foggy.";
				document.body.style.backgroundColor = "#B2B2B2";
        
        

    } else if (weather == "scattered clouds" || weather == "broken clouds" || weather == "clouds") {
        icon = "clouds.svg";
        description = "Looks like scattered clouds today.";
				document.body.style.backgroundColor = "#3F403B";
				
				

    } else if (weather == "rain" || weather == "light rain" || weather == "shower rain" || weather == "drizzle") {
        icon = "rain.svg";
        description = "Looks like rain."
				document.body.style.backgroundColor = "#71899A";
				
				

    } else if (weather == "thunderstorm") {
        icon = "thunder.svg";
        description = "Yikes, looks like a storm's brewing!"
				document.body.style.backgroundColor = "#3F403B";
				
				

    } else if (weather == "snow") {
        icon = "snow.svg";
        description = "Wrap up, it's going to snow!"
				document.body.style.backgroundColor = "#A1D7EE";
        

    } else {
        icon = "default.svg";
        description = "Oops, I couldn't find the weather in " + location;
    }

    document.getElementById("weatherIcon").src = "images/" + icon;
    document.getElementById("description").innerHTML = description;
    document.getElementById("temp").textContent = temperature + " °C"; /*kelvin, for celsius: (temperature - 273.15) + " °C"*/
}


// function setIconAndDescription(weather, location){
//
// 	var icon;
// 	var description;
//
// 	weather = weather.toLowerCase();
//
// 	if (weather == "clear sky"
// 		|| weather == "clear"){
//
// 		icon = "clear.svg";
// 		description = "Yay, sunshine!";
// 		document.body.style.backgroundColor = "#FA6144";
// 		document.getElementById("icon").style.backgroundColor = "#7A2F21";
// 			document.getElementById("temp").style.backgroundColor = "#7A2F21";
// 		document.getElementById("description").style.backgroundColor = "#E0563D";
//
// 	}
// 	else if (weather == "few clouds"){
//
// 		icon = "few-clouds.svg";
// 		description = "It's a little cloudy.";
// 		document.body.style.backgroundColor = "#FA6144";
// 		document.getElementById("icon").style.backgroundColor = "#7A2F21";
// 			document.getElementById("temp").style.backgroundColor = "#7A2F21";
// 		document.getElementById("description").style.backgroundColor = "#E0563D";
// 	}
// 	else if (weather == "scattered clouds"
// 		|| weather == "broken clouds"
// 		|| weather == "clouds"){
//
// 		icon = "clouds.svg";
// 		description = "Looks like scattered clouds today.";
// 		document.body.style.backgroundColor = "#FA6144";
// 		document.getElementById("icon").style.backgroundColor = "#7A2F21";
// 			document.getElementById("temp").style.backgroundColor = "#7A2F21";
// 	document.getElementById("description").style.backgroundColor = "#E0563D";
//
// 	}
// 	else if (weather == "rain"
// 	|| weather == "light rain"
// 	|| weather == "shower rain"){
//
// 		icon = "rain.svg";
// 		description = "Looks like rain."
// document.body.style.backgroundColor = "#FA6144";
// document.getElementById("icon").style.backgroundColor = "#7A2F21";
// 	document.getElementById("temp").style.backgroundColor = "#7A2F21";
// document.getElementById("description").style.backgroundColor = "#E0563D";
// 	}
// 	else if(weather == "thunderstorm"){
//
// 		icon = "thunder.svg";
// 		description = "Yikes, looks like a storm's brewing!"
// 		document.body.style.backgroundColor = ",";
// 		document.getElementById("icon").style.backgroundColor = "#7A2F21";
// 		document.getElementById("temp").style.backgroundColor = "#7A2F21";
// 		document.getElementById("description").style.backgroundColor = "#E0563D";
//
// 	}
// 	else if (weather == "snow"){
//
// 		icon = "snow.svg";
// 		description = "Wrap up, it's going to snow!"
//
// 	}
// 	else if (weather == "mist"){
//
// 		icon = "mist.svg";
// 		description = "Looks a little misty today.";
//
// 	}
// 	else {
//
// 		icon = "default.svg";
// 		description = "Oops, I couldn't find the weather in " + location;
//
// 	}
//
// 	document.getElementById("weatherIcon").src = "images/" + icon;
// 	document.getElementById("description").innerHTML = description;
//
// }

(function() {

	document.getElementById("btnGo").onclick = getLocation;


	document.getElementById("location").onkeypress = function(key){

		if (key.keyCode == "13"){

			getLocation();

		}
	};

})();