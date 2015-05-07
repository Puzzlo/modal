//      app

var express = require('express'),
    http = require('http'),
    path = require('path'),
    config = require('config'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    router = express.Router(),
    accepts = require('accepts'),
    favicon = require('serve-favicon'),
    session = require('express-session'),
    mongoose = require('libs/mongoose'),
    HttpError = require('error').HttpError;



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

var MongoStore = require('connect-mongo')(session);
app.use(session({
    secret: config.get('session:secret'),
    resave: true,
    saveUninitialized: true,
    key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));
//
//app.use(function (req, res, next) {
//    req.session.numberOfVisits = req.session.numberOfVisits +1 || 1;
//    res.send("Visits: " + req.session.numberOfVisits);
//});

app.use(require('middleware/sendHttpError'));

require('routes')(app);

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
    console.log(name + '   ' + password);
    next();
});

app.get('/chat', function (req, res, next) {
   //res.render('chat');
});


//app.use(function (err, req, res, next) {
//    if(typeof  err == 'number') {
//        err = new HttpError(err);
//        console.log('number');
//    }
//    if(err instanceof HttpError) {
//        res.sendHttpError(err);
//    }else {
//        if (app.get('env') == 'development') {
//            var errorHandler = express._errorHandler();
//            errorHandler(err, req, res, next);
//        } else {
//            log.error(err);
//            res.send(500);
//            res.sendHttpError(err);
//        }
//    }
//});

