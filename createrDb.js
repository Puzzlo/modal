var mongoose = require('libs/mongoose');
var async = require('async');
var User = require('models/user').User;

async.series([
    open,
    dropDataBase,
    createUsers,
    close
], function(err, results){
    console.log(arguments);
});


function open(callback){
    mongoose.connection.on('open',callback);
}

function dropDataBase(callback){
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
}

function createUsers(callback){
    async.parallel([
        function (callback) {
            var vasya = new User({username: 'Вася', password: 'super'});
            vasya.save(function (err) {
                callback(err, vasya);
            });
        },
        function (callback) {
            var petya = new User({username: 'Петя', password: 'tornado'});
            petya.save(function (err) {
                callback(err, petya);
            });
        },
        function (callback) {
            var admin = new User({username: 'ADMIN', password: 'admin'});
            admin.save(function (err) {
                callback(err, admin);
            });
        }
    ], callback);
}

function close(callback){
    mongoose.disconnect(callback);
}

