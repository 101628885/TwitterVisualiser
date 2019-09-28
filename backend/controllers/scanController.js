exports.scanGet = function(req, res){
    res.render('scan')
}

exports.scanPost = function(req, res){
    //logic for checking with model
    res.send({fake: "data"})
}