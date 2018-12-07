const express = require('express');
const router = express.Router();
const dataRoutes = require('../models/dataBase');


router.get('/route/:routeid', (req, res) => {
    dataRoutes.getRouteByID(req.params.routeid, (err, result) => {
        res.send(result);
    })
});

router.get('/city/:cityName', (req, res) => {
    dataRoutes.getCityRoutes(req.params.cityName, (err, result) => {
        res.send(result);
    })
});


router.get('/routes', (req, res) => {
    dataRoutes.getRoutes((err, result) => {
        res.send(result);
    })
});


router.get('/cities', ((req, res) => {
    dataRoutes.getCities((err, result) => {
        res.send(result);
    })
}));


module.exports = router;