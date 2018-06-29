var express = require('express'),
    app = express(),
    port = process.env.PORT || 6100,
    engines = require('consolidate'),
    session = require('express-session'),
    routes = require('./routes/appRoutes'),
    assert = require('assert'),
    nunjucks = require('nunjucks');

global.bodyParser = require('body-parser');
global.request = require('request');
//global.mc_api = "https://bx-client.appspot.com/";
global.mc_api = "http://localhost:9000/";
global.urlpath = "http://localhost:6100/";
global.helpers = require('./helpers/helpers');


//configure and create custom nunjucks filters
engines.requires.nunjucks = nunjucks.configure();

engines.requires.nunjucks.addFilter('shortDate', function(dateValue) {
    return helpers.shortDate(dateValue);
});

engines.requires.nunjucks.addFilter('Add', function(val1, val2) {
    if (val1 == undefined) {
        val1 = 0;
    }
    if (val2 == undefined) {
        val2 = 0;
    }
    return (helpers.StringToNum(val1) + helpers.StringToNum(val2));
});

engines.requires.nunjucks.addFilter('AddOne', function(val) {
    if (val == undefined) {
        val = 0;
    }
    return (helpers.StringToNum(val) + 1);
});

engines.requires.nunjucks.addFilter('addDay', function(value) {
    var d = new Date(value);
    d.setDate(d.getDate() + 1);
    return helpers.shortDate(d.toISOString());
});

engines.requires.nunjucks.addFilter('toTitleCase', function(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
});

//initialize bodyParser and errorHandler
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/resources'));
app.use(bodyParser.json());

app.use(session({ secret: 'as465asdwqwdzcafd56a5df45a46df22535' }));
//app.use(errorHandler);

var urlencodedParser = bodyParser.urlencoded({ extended: false });

routes(app);

app.listen(port);
console.log('Bookinx Travels & Logistics client running on port ' + port);