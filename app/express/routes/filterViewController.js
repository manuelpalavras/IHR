const express = require('express');
const router = express.Router();
const path = require('path');
const dataRoutes = require('../models/dataBase');

router.get('/filterPage.hbs', (req, res) => {
    res.redirect('/home');
});

router.get('/mapPage.hbs', (req, res) => {
    res.redirect('/home');
});

router.get('/city=:cityName', (req, res) => {
    console.log(`Pesquisar pelas rotas da cidade de ${req.params.cityName.toString()}`);

    res.render('filterPage.hbs', {
        root: path.join(__dirname, 'views'),
        nome: req.params.cityName.toString()
    });
});

router.get('/PoI=:poiName', (req, res) => {
    console.log(`Pesquisar pelas rotas que têm o PoI ${req.params.poiName}`);

    res.render('filterPage.hbs', {
        root: path.join(__dirname, 'views'),
        nome: req.params.poiName.toString()
    });
});

router.get('/filter/:nome/:array1/:array2/:array3', (req, res) => {

    let nome = req.params.nome;
    let tipos = [].Arrayify(req.params.array1);
    let classificacao = [].Arrayify(req.params.array2);
    let dificuldade = [].Arrayify(req.params.array3);

    dataRoutes.getFilteredRoutes(nome,tipos,classificacao,dificuldade,(err,result) =>{
        console.log(result)
    })

    res.send('ok');
});

Array.prototype.Arrayify = function(str) {
    let array = str.split(",");
    return array;
};

module.exports = router;