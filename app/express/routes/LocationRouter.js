
let location = require('../services/LocationService')
let express = require('express');




let router = express.Router();


router.post('/coordinates',(req, res ,next) => {

    let latitude = req.body.latitude;
    let longitude =req.body.longitude;

    location.postLocation(latitude,longitude, (err,result) => {
        if(err)
            next();
        else
            res.send(result)
    })
});



module.exports = router;
