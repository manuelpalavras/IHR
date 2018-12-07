'use strict';

const path = require('path');
const debug = require('debug');
const port = 8080;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cons = require('consolidate');

// viewed at http://localhost:8080
app.set('views', './views');
app.set('view engine', 'hbs');

app.engine('hbs', cons.handlebars);
app.use('/', express.static("views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));


/**
 *  Routers
 */

const locationRouter = require('./routes/locationRouter');
const informationRouter = require('./routes/informationRouter');
const mainRouter = require('./routes/mainRouter');
const viewController = require('./routes/ViewController');


app.use('/location', locationRouter);
app.use('/information', informationRouter);
app.use('/', mainRouter);
app.use('/', viewController);



app.listen(port, () => console.log('server working'));


/**
 * Errors
 */

// //  catch 404 and forward to error handler
// // app.use(function (req, res, next) {
// //     const err = new Error('Not Found');
// //     err.status = 404;
// //     next(err)
// // });
// //
// // // error handler
// // app.use(function (err, req, res) {
// //     // set locals, only providing error in development
// //     debug(`${req.method} ${req.url} - ${err.status} ${err.message}`);
// //     res.locals.message = err.message;
// //     res.locals.error = req.app.get('env') === 'development' ? err : {};
// //
// //     // render the error page
// //     res.status(err.status || 500);
// //     res.render('error')
// // });

module.exports = app;