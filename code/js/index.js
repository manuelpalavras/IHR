let http = require('http'); //http is a module
let server = http.createServer(engine);
//[protocol]://[subdomain].[websiteName].[tID]:[port]/[path]?[query]=[string]#[hash]

server.listen(8080, function () {
    console.log('Server was hit by a request');
});


//listen chama o port associado ao site em que ele está a correr no server

function engine(request, response) {

    response.writeHead(200, {'Content-type': 'text/plain'});
    response.send('Hello World' + request.url);

}


// npm - node package number

// Module
// Consider modules to be the same as JavaScript libraries.
// A set of functions you want to include in your application.