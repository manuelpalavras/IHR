
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
    } else {
        location.innerHTML = "Geolocation is not supported by this browser.";
    }

}

function showPosition(position) {
    $.post('/location/coordinates', position.coords , null, 'coordinates');
}
