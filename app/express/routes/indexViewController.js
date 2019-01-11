'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/home', (req,res) => {
    res.render('index.hbs', {root: path.join(__dirname, 'views')})
});

router.get('/', (req,res) => {
    res.redirect('/home');
});




module.exports = router;