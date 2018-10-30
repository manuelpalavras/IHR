var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {
    fs.readFile("C:\\Users\\mword\\Documents\\GitHub\\IHR\\code\\html\\index.html", function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'}, {'Content-Type': 'text/css'});
        res.write(data);
        res.end();
    });
}).listen(8080);