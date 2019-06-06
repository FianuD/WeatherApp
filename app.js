window.addEventListener('load', () => {
    let long;
    let lat;
    // Get DOM elements that will display the weather information
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    const locationTimezone = document.querySelector('.location-timezone');
    const temperatureSection = document.querySelector('.temperature-section');
    const temperatureSpan = document.querySelector('.temperature-section span');

    // to get longitude and latitude using built-in functionality
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            // darksky api doesn't allow calling on localhost
            // so using proxy to bypass CORS error
            const proxy = "https://cors-anywhere.herokuapp.com/";
            // weather api from darksky. Replaced long and latitude with values above
            const api = `${proxy}https://api.darksky.net/forecast/547570ce559a29780a721d4ec398d249/${lat},${long}`;
            fetch(api)
            .then(response => {
                //change the response or data received into a json
                return response.json();
            })
            .then(data => {
                // console.log(data);
                // get relevant information from pulled data.
                const {temperature, summary, icon} = data.currently;
                // set DOM Elements from the API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                // Formula for Celcius
                let celcius = (temperature - 32) * (5 / 9);
                // Set Icon
                setIcons(icon, document.querySelector('.icon'))
                // change temperature to Celcius/Fahrenheit
                temperatureSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent === "F") {
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = celcius.toFixed(0);
                    } else {
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;
                    }
                })
            });
        });
    } else {
        // For when location can not be pulled or is refused
        h1.textContent = "Hey, this is not working because we didn't get a location!"
    }

    // using skyicons to show icon of current weather condition on the page
    function setIcons(icon, iconId) {
        // initialise the icons
        const skycons = new Skycons({color: "white"});
        // replace dashes with underscores and make text uppercase
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        // to animate
        skycons.play();
        return skycons.set(iconId, Skycons[currentIcon])
    }
});