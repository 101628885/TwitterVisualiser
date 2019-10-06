const mongoController = require('./mongoController');
const SqliteDAO = require('./sqliteController')
const SqliteRepository = require('./sqliteRepo')

exports.searchImages = async (req, res) => {
    let keywords = req.body.words;
    let count = req.body.db_count;

    const dao = new SqliteDAO('./../classifybot/imageClassified.db')
    const SqliteRepo = new SqliteRepository(dao)

        crimeNumTypesArr = {
            '0': "No Crime",
            '1': "Assault",
            '2': "Murder",
            '3': "Theft",
            '4': "Kidnap",
            '5': "Scene",
            '99': "Other"
        }

    query = ""
    query = `SELECT * FROM images WHERE crimeType=`
    
    //this won't work proper anyway
    if(req.body.crimes){
        query += req.body.crimes.join(' OR crimeType=')
    }

    //unused mongo search
    //images.collection.find( { tags: { $bitsAnySet: req.body.crimes } } )

    if (typeof req.body.db_crime !== 'undefined'){
        query += " LIMIT "+req.body.db_count
    }else{
        query += " LIMIT 30"
    }

    console.log(query)

    dao.all(query)
        .then(images => {
            res.render('imagesearch', {
                //first 30
                data: images.map(image => ({
                    full_text: (crimeNumTypesArr[image.crimeType] + ": " + image.caption),
                    image_url: (image.filename)
                }))
            });
        })
        .catch(function (err) {
            console.log(err)
        });
};