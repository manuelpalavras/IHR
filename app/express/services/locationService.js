const fs = require('fs');

function postLocation(latitude,longitude, cb) {

    const coordinates = {
    Latitude: latitude, Longitude: longitude
    };

    let json = JSON.stringify(coordinates);

    fs.writeFile('public/json/locationInfo.json', json, 'utf8', (err,res) =>{
       if(err)
           res.send(err);
    });
    cb(null,null);
}
module.exports = {
    postLocation
};


