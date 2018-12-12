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

router.get('/types/:Cidade', (req, res) => {
    dataRoutes.getTypesOfRoutesByCity(req.params.Cidade, (err, result) => {
        res.send(result);
    })
});

router.get('/dificulty/:Cidade', (req, res) => {
    dataRoutes.getDificultyByCity(req.params.Cidade, (err, result) => {
        res.send(result);
    })
});

router.get('/classification/:Cidade', (req, res) => {
    dataRoutes.getClassificationByCity(req.params.Cidade, (err, result) => {
        res.send(result);
    })
});

router.get('/routes/PoI/:Name', (req, res) => {

    dataRoutes.getRoutesOfPoI(req.params.Name, (err, result) => {
        res.send(result);
    })
});

router.get('/PoI', (req, res) => {

    dataRoutes.getPoI((err, result) => {
        res.send(result);
    })
});


module.exports = router;