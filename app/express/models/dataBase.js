const mongo = require('./dbConn');
const ObjectID = require('mongodb').ObjectID;
const fs = require('fs');

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
        db.collection('Cidades').find().toArray((err, result) => {
            if (err)
                cb('routes not found');
            else {
                cb(err, result)
            }
        })
    })
};

exports.getTypesOfRoutesByCity = function (rota, cb) {
    mongo((db) => {
        db.collection('Rotas').distinct('Tipo', {Nome : rota}, (err, result) => {
            if (err)
                cb('tipos not found');
            else {
                cb(err, result)
            }

        })
    })
};

exports.getDifficultyByCity = function (rota, cb) {

    mongo((db) => {
        db.collection('Rotas').distinct('Dificuldade', {Nome : rota}, (err, result) => {
            if (err)
                cb('dificuldade not found');
            else {
                cb(err, result)
            }
        })
    })
};


exports.getClassificationByCity = function (rota, cb) {

    mongo((db) => {
        db.collection('Rotas').distinct('Classificacao', {Nome : rota}, (err, result) => {
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



exports.getJSONFile = function (nome, cb) {
    let content;
    fs.readFile(`models/json/${nome}`,'utf-8', (err, data) => {
        if (err)
            cb(err);
        else {
            //let buf = Buffer.from(data);
            // console.log(data);
            content = JSON.parse(data);
            cb(null, data);
        }
    });
};

exports.clearJSON = function(cb) {
    let json = "{}";
    fs.writeFile('models/json/locationInfo.json', json, 'utf8', (err,res) =>{
        if(err)
            res.send(err);
    });
    cb(null,null)
};
//simula um post à base de dados quando tivermos utlizadores para obter um historico de localizações

exports.postLocation = function (latitude,longitude, cb) {

    const coordinates = {
        ponto:[latitude, longitude]
    };

    let json = JSON.stringify(coordinates);

    fs.writeFile('models/json/locationInfo.json', json, 'utf8', (err,res) =>{
        if(err)
            res.send(err);
    });
    cb(null,null);
};

exports.getFilteredRoutes = function (nome,tipos,classificacao,dificuldade, cb) {



    mongo((db) => {
    let queryTipos = ""
    let queryClassificacao = ""
    let queryDificuldade = ""
        for (let i = 0; i <tipos.length ; i++) {
        if (tipos[i] !== "null") {
            if(i==tipos.length-1) {
                queryTipos = queryTipos + `{"Tipo" : /.*${tipos[i]}.*/i}`
            }
            else{
                queryTipos = queryTipos + `{"Tipo" : /.*${tipos[i]}.*/i},`
            }
        }
        }
        for (let i = 0; i <classificacao.length ; i++) {
            if (classificacao[i] != "null") {
                if(i==classificacao.length-1) {
                    queryClassificacao = queryClassificacao + `{ "Classificacao": { $gte: ${classificacao[i]-0.5}, $lte: ${classificacao[i]+0.4} } }`
                }
                else{
                    queryClassificacao= queryClassificacao + `{ "Classificacao": { $gte: ${classificacao[i]-0.5}, $lte: ${classificacao[i]+0.4} } },`
                }
            }
        }
        for (let i = 0; i <dificuldade.length ; i++) {
            if (dificuldade[i] != "null") {
                if(i==dificuldade.length-1) {
                    queryDificuldade = queryDificuldade + `{ { "Dificuldade": "${dificuldade[i]}" } }`
                }
                else{
                    queryDificuldade = queryDificuldade + `{"Dificuldade": "${dificuldade[i]}"},`
                }
            }
        }
       let queryS=`{"$and" : [{ "Cidade": "${nome}"},{"$or":[${queryTipos}]},{"$or":[${queryClassificacao}]},{"$or":[${queryDificuldade}]}]}`
        db.collection("Rotas").find(queryS).toArray((err, res) => {
            if (err || res == null){
                cb('route not found');}
            else {
                cb(err, res)

            }


        })})
}