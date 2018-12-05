const express = require('express');
const router = express.Router();
const dataRoutes = require('../models/routes');


router.get('/routes/:routeName', (req, res) => {
    dataRoutes.getRouteByName(req.params.routeName, (err, result) => {
        res.send(result);
    })
});

router.get('/city/:cityName', (req,res) => {
    dataRoutes.getCityRoutes(req.params.cityName, (err, result) => {
        res.send(result);
    })
});

router.get('/routes', (req,res) => {
   dataRoutes.getRoutes((err,result) => {
       res.send(result);
   })
});


router.get('/cities' , ((req,res) => {
    dataRoutes.getCities((err,result) => {
        res.send(result);
    })
}));


module.exports = router;