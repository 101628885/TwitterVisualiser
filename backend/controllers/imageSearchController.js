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
    query = `SELECT * FROM images WHERE crimeType!=0`
    switch (req.body.word) {
        case 'assault':
            query += " WHERE crimeType=1"
            break;
        case 'murder':
            query += " WHERE crimeType=2"
            break;
        case 'theft':
            query += " WHERE crimeType=3"
            break;
        case 'kidnap':
            query += " WHERE crimeType=4"
            break;
        case 'scene':
            query += " WHERE crimeType=5"
            break;
        case 'other':
            query += " WHERE crimeType=99"
            break;
        default:
            break;
    }
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
                    image_url: ("../" + image.filename)
                }))
            });
        })
        .catch(function (err) {
            console.log(err)
        });
};