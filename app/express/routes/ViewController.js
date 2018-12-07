const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/home', (req,res) => {
    res.render('index.hbs', {root: path.join(__dirname, 'views')})
});

router.get('/', (req,res) => {
    res.redirect('/home');
});

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

router.get('/route=:routeId', (req, res) => {

    console.log(`Pesquisar pela rotas escolhida com o nome de ${req.params.routeId}`);

    res.render('mapPage.hbs', {
        root: path.join(__dirname, 'views'),
        id: req.params.routeId
    });
});

module.exports = router;