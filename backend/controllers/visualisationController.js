const mongoController = require('./mongoController');
var viscrime = mongoController.viscrime;

//Gets all images from the .
//If no parameters default values are set.
exports.getVisualisationView = async (req, res) => {
    viscrime.aggregate([{ "$project": { "manualAnnotation":1 }},  
    { "$unwind": "$manualAnnotation" },  
    { "$group": { "_id": "$manualAnnotation", "count": { "$sum": 1 } }}]).exec()
        .then(viscrime => {
            var labels = viscrime.map(x => x._id);
            var data = viscrime.map(x => x.count);
            res.render('visualisations', {
                labels: labels,
                data: JSON.stringify(data),
            });
        })
        .catch(function (err) {
            console.log(err)
    });
};