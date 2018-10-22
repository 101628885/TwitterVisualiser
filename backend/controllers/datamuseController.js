const sparql = require('sparql');
const request = require('request');
const test = require('./cacheController');

//https://www.datamuse.com/api/
//Gets related keywords form DataMuse
exports.getDataMuse = async(req, res, callback) =>
{
    let wordQuery = req.body.word;

    if (wordQuery == "")
    {
        wordQuery = "crime";
    }

	options =
		{
			method: "GET",
			url: `https://api.datamuse.com/words?rel_trg=` + wordQuery
		}

    request(options, function (error, response, body)
    {
        if (!error)
        {
            let words = []
            let labels = wordQuery + " OR ";
            words.push(wordQuery);
            for (let i = 0; i < 8; i++)
            {
                if (body == "[]")
                {
                    break;
                }

                labels += JSON.parse(body)[i].word;
                words.push(JSON.parse(body)[i].word);
                if (i != 7)
                {
                    labels += " OR " ;
                }
            }
            let result = {
                words : words,
                labels : labels
            };

            callback(result);

        } else
        {
            res.send(JSON.parse(error));
        }
    });
}

//Gets results from DataMuse, creates an array and build the query to Twitter
//If more than Datamuse is used, call in here.
exports.getCombination = async (req, res, next) =>
{
    let result;
    exports.getDataMuse(req, res, function (dataMuseResults) { //get results fom DataMuse

        result = dataMuseResults;

        result.labels += " AND -filter:retweets AND -filter:replies";

        req.body.dbResults = result.labels;
        req.body.words = result.words;

        next();
    });


}

