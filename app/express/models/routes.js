const mongo = require('./dbConn');

exports.getRouteByName = function (name, cb) {

    mongo((db) => {
        db.collection('Rotas').findOne({Nome: name}, (err, res) => {
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

