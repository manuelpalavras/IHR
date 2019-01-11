'use strict';

const express = require('express');
const router = express.Router();
const dataBase = require('../models/dataBase');

router.get('/PoI', (req, res) => {

    dataBase.getPoI((err, result) => {
        res.send(result);
    })
});

router.get('/getJSONFile/:file', (req, res, next) => {


    let file = req.params.file;

    dataBase.getJSONFile(file, (err, result) => {
        if (err)
            next();
        else {
            res.send(result);
        }
    });
});

router.post('/coordinates',(req, res ,next) => {

    let latitude = req.body.latitude;
    let longitude =req.body.longitude;

    dataBase.postLocation(latitude,longitude, (err,result) => {
        if(err)
            next();
        else
            res.send(result)
    })
});

router.post('/clearJSON', (req, res ,next) => {

    dataBase.clearJSON((err,result) => {
        if(err)
            next();
        else res.send(result);
    })
});

module.exports = router;
