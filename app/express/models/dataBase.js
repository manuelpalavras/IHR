const mongo = require('./dbConn');
const ObjectID = require('mongodb').ObjectID;

exports.getRouteByID = function (id, cb) {

    mongo((db) => {
        db.collection('Rotas').findOne({_id: new ObjectID(id)}, (err, res) => {
            if (err || res == null)
                cb('route not found');
            else {
                cb(err, res)

            }

        })
    })
};

exports.getCityRoutes = function (name, cb) {

    mongo((db) => {
        db.collection('Rotas').find({Cidade: name}).toArray((err, result) => {
            if (err)
                cb('routes not found');
            else
                cb(err, result)
        })
    })
};

exports.getRoutes = function (cb) {
    mongo((db) => {
        db.collection('Rotas').find().toArray((err, result) => {
            if (err)
                cb('routes not found');
            else
                cb(err, result)
        })
    })

};

exports.getCities = function (cb) {
    mongo((db) => {
        db.collection('Rotas').distinct('Cidade', (err, result) => {
            if (err)
                cb('routes not found');
            else {

                cb(err, result)
            }
        })
    })
};

exports.getTypesOfRoutesByCity = function (cidade, cb) {
    mongo((db) => {
        db.collection('Rotas').distinct('Tipo', {Cidade: cidade}, (err, result) => {
            if (err)
                cb('tipos not found');
            else {
                cb(err, result)
            }

        })
    })
};

exports.getDificultyByCity = function (cidade, cb) {

    mongo((db) => {
        db.collection('Rotas').distinct('Dificuldade', {Cidade: cidade}, (err, result) => {
            if (err)
                cb('dificuldade not found');
            else {
                cb(err, result)
            }
        })
    })
};


exports.getClassificationByCity = function (cidade, cb) {

    mongo((db) => {
        db.collection('Rotas').distinct('Classificacao', {Cidade: cidade}, (err, result) => {
            if (err)
                cb('Classificacao not found');
            else {
                cb(err, result)
            }
        })
    })
};

exports.getRoutesOfPoI = function (PoI, cb) {

    mongo((db) => {
        db.collection('Rotas').find({PoI: {$elemMatch: {Nome: `${PoI}`}}}).toArray((err, result) => {
            if (err)
                cb('Routes not found');
            else {
                cb(err, result)
            }
        })
    })
};

exports.getPoI = function (cb) {

    mongo((db) => {
        db.collection('Rotas').distinct("PoI.Nome", (err, res) => {
            if (err)
                cb('PoI not found');
            else
                cb(err, res)
        })
    })


};