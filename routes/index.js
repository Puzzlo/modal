//      index

var User = require('models/user').User,
    HttpError = require('error').HttpError;

module.exports = function (app) {


    app.get('/', function (req, res) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        //res.header("Content-Type", "application/json; charset=utf-8");
        //res.render('index');
        res.render('index');
    });

    app.get('/users', function (req, res, next) {
        User.find({}, function (err, users) {
            if(err) return next(err);
            res.json(users);
        })
    });

    app.get('/users/:id', function (req, res, next) {
        User.findById(req.params.id, function(err, user){
            if(err) return next(err);
            if(!user) {
                new HttpError(404, "User not found");
            //    console.log('in error');
            }
            //console.log(res.json(user));
            res.json(user);
        });
    });

};