//      registration

exports.post = function (req, res) {
    var name = req.body.name,
        pass1 = req.body.pass,
        pass2 = req.body.passAgain;
    console.log('name=' + JSON.stringify(req.body));

};