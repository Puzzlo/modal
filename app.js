//      app

var express = require('express'),
    http = require('http'),
    path = require('path'),
    config = require('config'),
    bodyParser = require('body-parser'),
    favicon = require('express-favicon');



var app = express();

app.set('views', __dirname + '/templates');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);
app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/image/favicon.ico'));

// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

http.createServer(app).listen(config.get('port'), function () {
    console.log('listen');
});
