const fs = require('fs');

function getJSONFile(path, cb) {
    let content;
    fs.readFile(`public/json/${path}`,'utf-8', (err, data) => {
        if (err)
            cb(err);
        else {
            //let buf = Buffer.from(data);
            // console.log(data);
            content = JSON.parse(data);
            cb(null, data);
        }
    });
}

module.exports = {
    getJSONFile
};