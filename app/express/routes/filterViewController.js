const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/filterPage.hbs' , (req,res) => {
    res.redirect('/home');
});

router.get('/mapPage.hbs', (req,res) => {
    res.redirect('/home');
});

router.get('/city=:cityName', (req, res) => {
    console.log(`Pesquisar pelas rotas da cidade de ${req.params.cityName.toString()}`);

    res.render('filterPage.hbs', {
        root: path.join(__dirname, 'views'),
        nome: req.params.cityName.toString()
    });
});

router.get('/PoI=:poiName' , (req,res) => {
    console.log(`Pesquisar pelas rotas que têm o PoI ${req.params.poiName}`);

    res.render('filterPage.hbs', {
        root: path.join(__dirname, 'views'),
        nome: req.params.poiName.toString()
    });
});

module.exports = router;