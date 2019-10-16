const mongoController = require('./mongoController');
var viscrime = mongoController.viscrime;

exports.searchImages = async (req, res) => {
    let count = req.body.db_count ? parseInt(req.body.db_count) : 20;
    let skip = 0;
    var crimes = req.body.crimes ? req.body.crimes : 'NoCrime';
    if (!Array.isArray(crimes))
    {
        crimes = [crimes];
    }

    viscrime.find({manualAnnotation: {$all: crimes}}).limit(count).skip(skip).lean().exec()
        .then(viscrime => {
            console.log(viscrime);
            res.render('imagesearch', {
                data: viscrime
            });
        })
        .catch(function (err) {
            console.log(err)
        });
};