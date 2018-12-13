const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/route=:routeId', (req, res) => {

    console.log(`Pesquisar pela rotas escolhida com o nome de ${req.params.routeId}`);

    res.render('mapPage.hbs', {
        root: path.join(__dirname, 'views'),
        id: req.params.routeId
    });
});

module.exports = router;
