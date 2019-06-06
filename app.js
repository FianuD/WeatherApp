window.addEventListener('load', () => {
    let long;
    let lat;

    // to get longitude and latitude using built-in functionality
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            // weather api from darksky. Replaced long and latitude with values above
            const api = `https://api.darksky.net/forecast/547570ce559a29780a721d4ec398d249/${lat},${long}`;
        });

        fetch()
    } else{
        // For when location can not be found
        h1.textContent = "Hey, this is not working because reasons!"
    }
});