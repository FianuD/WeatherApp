window.addEventListener('load', () => {
    let long;
    let lat;

    // to get longitude and latitude using built-in functionality
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
        })
    } else{
        // For when location can not be found
        h1.textContent = "Hey, this is not working because reasons!"
    }
});