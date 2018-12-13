function getLocation() {
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

let input = document.getElementById("search");
// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function (event) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Trigger the button element with a click
        document.getElementById("button").click();
    }
});