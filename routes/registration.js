//      registration

var mongoose = require('libs/mongoose.js');
var User = require('models/user.js').User;

//mongoose.connection.on('open', function(){
//    var db = mongoose.connection.db;
//    db.dropDatabase(function(err) {
//        if(err) throw err;
//        console.log('ok, db is dropped');
//        mongoose.disconnect();
//    });
//});


exports.post = function (req, res) {
    var name = req.body.name,
        pass = req.body.pass,
        mess = 'Извините, пользователь с таким именем уже существует.'
                + '<br/>'
                +  'Попробуйте придумать новый псевдоним';
    console.log('name=' + JSON.stringify(req.body));

    User.findOne({username: name}, function (err, user) {
        if(user) {
            console.log('есть такой уже юзер');
            //next(new HttpError(403, 'Password not veren'));
            res.status(200).send({message: 'Извини'});
        } else {
            var newUser = new User({username: name, password: pass});
            newUser.save(function (err) {
                if(err) return next(err);
            });
        }
    });


};