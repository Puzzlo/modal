//      test
exports.get = function(req, res) {
    res.render('test', {id: req.session.user});
};

exports.post = function(req, res) {
    res.render('test', {id: req.session.user});
};