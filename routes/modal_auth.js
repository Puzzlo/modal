//      modal_auth

var User = require('models/user').User;
var async = require('async');

exports.get = function(req, res) {
    res.render('modal_auth');
};

exports.post = function (req, res, next) {
    var user = req.body.name;
    var pass = req.body.password;

    User.findOne({username: user}, function (err, user) {
        if(err) return next(err);
        if(user) {
            if(user.checkPassword(pass)) {
                // 200
            } else {
                // wrong password
            }
        } else {
            // user not find
        }
    });
};