


function postLocation(latitude,longitude, cb) {

    let coordinates = {
    Latitude: latitude, Longitude: longitude
    };

    let json = JSON.stringify(coordinates);
    let fs = require('fs');
    fs.writeFile('public/json/locationInfo.json', json, 'utf8', (err,res) =>{
       return
    });
    cb(null,null);
}
module.exports = {
    postLocation

};


