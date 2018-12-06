const express = require('express');
const router = express.Router();
const informationService = require('../services/informationService.js');

router.get('/getJSONFile/:file', (req, res, next) => {


    let file = req.params.file;

    informationService.getJSONFile(file, (err, result) => {
        if (err)
            next();
        else {
            res.send(result);
        }
    });
});

module.exports = router;
