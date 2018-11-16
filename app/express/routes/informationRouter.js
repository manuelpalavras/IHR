const express = require('express');
const router = express.Router();
const informationService = require('../services/informationService.js');
const jquery = require('../views/lib/jquery/jquery-3.3.1')

router.get('/getJSONFile/:file', (req, res, next) => {


    let file = req.params.file;

    informationService.getJSONFile(file, (err, result) => {
        if (err)
            next();
        else {
            console.log(result);
            res.send(result);
        }
    });
});

router.get(('/'), (req, res, next) => {
    res.send("SUCCESS")
});

router.get(('/getFile'), (req, res, next) => {

    res.send("SUCCESS");
});

module.exports = router;
