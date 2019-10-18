const mongoController = require('./mongoController');
var viscrime = mongoController.viscrime;

// manualAnnotation and objectLabel Visualation
exports.getVisualisationView = async (req, res) => {
    var manualLabels;
    var manualData;
    var objectLabels;
    var objectData;

    viscrime.aggregate([{ "$project": { "manualAnnotation":1 }},  
    { "$unwind": "$manualAnnotation" },  
    { "$group": { "_id": "$manualAnnotation", "count": { "$sum": 1 } }}]).exec()
        .then(viscrime => {
            manualLabels = viscrime.map(x => x._id);
            manualData = viscrime.map(x => x.count);
        })
        .catch(function (err) {
            console.log(err);
        });

    viscrime.aggregate([{ "$project": { "objectLabels":1 }},  
    { "$unwind": "$objectLabels" },  
    { "$group": { "_id": "$objectLabels", "count": { "$sum": 1 } }}]).exec()
        .then(viscrime => {
            objectLabels = viscrime.filter(x => x.count >= 250).map(x => x._id);
            objectData = viscrime.filter(x => x.count >= 250).map(x => x.count);
            
            res.render('visualisations', {
                manualLabels: manualLabels,
                manualData: JSON.stringify(manualData),
                objectLabels: objectLabels,
                objectData: JSON.stringify(objectData),
            });
        })
        .catch(function (err) {
            console.log(err);
        });
};