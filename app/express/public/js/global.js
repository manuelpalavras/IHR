function getLocation() {
    $.post('/clearJSON',null,null,null);
    if (navigator.geolocation) {

        navigator.geolocation.watchPosition(showPosition);
    } else {
        location.innerHTML = "Geolocation is not supported by this browser.";
    }

}

function showPosition(position) {
    $.post('/coordinates', position.coords, null, 'coordinates');
}

function search() {
    $("#button").attr('href', `/city=${capitalizeFirstLetter($('#search').val().toLowerCase())}`)
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

$("#search").keyup(function (event) {
    if (event.keyCode === 13) {
        $("#button").click();
    }
});

$("#button").click(`/city=${capitalizeFirstLetter($('#search').val().toLowerCase())}`);