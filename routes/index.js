//      index

var User = require('models/user').User,
    HttpError = require('error').HttpError;

module.exports = function (app) {


    app.get('/', require('./frontpage').get);

    app.get('/chat', require('./chat').get);

    app.get('/test', require('./test').get);
    app.post('/test', require('./test').post);

    app.get('/auth', require('./auth').get);

    app.post('/auth', require('./auth').post);

    app.post('/registration', require('./registration').post);


    app.get('/users', function (req, res, next) {
        User.find({}, function (err, users) {
            if(err) return next(err);
            res.json(users);
        })
    });

    app.get('/users/:id', function (req, res, next) {
        console.log('in users/:id='+ req.params.id);
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