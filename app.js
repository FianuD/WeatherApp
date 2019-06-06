window.addEventListener('load', () => {
    let long;
    let lat;
    // Get DOM elements that will display the weather information
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');

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
                // get out relevant information from pulled data.
                const {temperature, summary} = data.currently;
                // set DOM Elements from the API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
            });
        });
    } else{
        // For when location can not be pulled or is refused
        h1.textContent = "Hey, this is not working because we didn't get a location!"
    }
});