window.addEventListener('load', () => {
    let long;
    let lat;

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
                console.log(data);
            });
        });
    } else{
        // For when location can not be pulled or is refused
        h1.textContent = "Hey, this is not working because we didn't get a location!"
    }
});