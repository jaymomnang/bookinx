var express = require('express'),
    app = express(),
    port = process.env.PORT || 6100,
    engines = require('consolidate'),
    session = require('express-session'),
    routes = require('./routes/appRoutes'),
    assert = require('assert');

global.bodyParser = require('body-parser');
global.request = require('request');
global.mc_api = "http://localhost:6000/";
global.urlpath = "http://localhost:6100/";


//initialize bodyParser and errorHandler
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/resources'));
app.use(bodyParser.json());

var nunjucks = require('nunjucks');
var env = new nunjucks.Environment();

env.addFilter('shorten', function(dateValue) {
    var d = dateValue.getDate() + ' ' + dateValue.getMonth() + ' ' + dateValue.getYear();
    return d;
});


app.use(session({ secret: 'as465asdwqwdzcafd56a5df45a46df22535' }));
//app.use(errorHandler);

var urlencodedParser = bodyParser.urlencoded({ extended: false });

routes(app);

app.listen(port);
console.log('Bookinx Travels & Logistics client running on port ' + port);