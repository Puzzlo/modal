//      modal_auth

var User = require('models/user').User;
var async = require('async');

exports.get = function(req, res) {
    res.render('modal_auth');
};

exports.post = function (req, res, next) {
    var name = req.body.name;
    var pass = req.body.pass;
    console.log('name=' + JSON.stringify(req.body)+' pass='+pass);

    //User.findOne({username: name}, function (err, user) {
    //    if(err) return next(err);
    //    console.log(user.checkPassword(pass));
    //    if(user) {
    //        if(user.checkPassword(pass)) {
    //            console.log('логин и пассворд верны');
    //            // 200
    //        } else {
    //            // wrong password
    //            console.log('логин верен, пароль нет');
    //        }
    //    } else {
    //        console.log('логина нет такого');
    //        // user not find
    //    }
    //});

    User.authorize(name, pass, function (err, user) {
        if(err) {
            console.log('ошибка авторизации');
            return next(err);
        }
        console.log(user);
        res.locals.user = req.user;
        req.session.user = user._id;
        res.render('test', {id: user._id});
        //res.render('test', {id: req.session.user});
        //res.sendStatus(req.session.user);
        //res.json({id:req.session.user});
        //res.status(200).end();
        console.log('внутри авторизации    '+req.session.user);
    });
};