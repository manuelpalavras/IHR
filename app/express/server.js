let express = require('express');
let app = express();
let port = 8080;

// viewed at http://localhost:8080
app.use('/', express.static("views"));
app.use('/stylesheets' , express.static("public/stylesheets"));

app.listen(port , () => console.log('merdum'));