//      app

var express = require('express'),
    http = require('http'),
    path = require('path'),
    config = require('config'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    router = express.Router(),
    accepts = require('accepts'),
    favicon = require('serve-favicon');



var app = express();

app.set('views', __dirname + '/templates');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, '/public/image/favicon.ico')));

// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(cookieParser()); // req.cookies

http.createServer(app).listen(config.get('port'), function () {
    console.log(Date.now());
    //console.log(path.join(__dirname, 'public'));
});

app.get('/auth', function (req, res, next) {
    //res.render('modal_auth');
    console.log('in auth');
    next();
});

app.post('/auth', function (req, res, next) {
    var name = req.body.name;
    var password = req.body.pass;
    next();
});

app.get('/chat', function (req, res, next) {
   //res.render('chat');
});

app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    //res.header("Content-Type", "application/json; charset=utf-8");
    //res.render('index');
    res.render('index');
});

