const sparql = require('sparql')
const request = require('request')
const resultLimit = 30;
exports.getDBPedia = async(req,res, next) =>
{
    client = new sparql.Client('http://dbpedia.org/sparql')
    let value = req.body.word
    let query = `SELECT ?label WHERE 
	{ 
		{ 
			<http://dbpedia.org/resource/${value}> <http://dbpedia.org/ontology/wikiPageRedirects> ?x.
     		?x rdfs:label ?label.
     	}
     	UNION
     	{ 
     		<http://dbpedia.org/resource/${value}> <http://dbpedia.org/ontology/wikiPageRedirects> ?y.
     		?x <http://dbpedia.org/ontology/wikiPageRedirects> ?y.
     		?x rdfs:label ?label.
     	}
    	UNION
     	{
     		?x <http://dbpedia.org/ontology/wikiPageRedirects> <http://dbpedia.org/resource/${value}>.
     		?x rdfs:label ?label.
     	}
     	UNION
     	{ 
     	?y <http://dbpedia.org/ontology/wikiPageRedirects> <http://dbpedia.org/resource/${value}>.
     	?x <http://dbpedia.org/ontology/wikiPageRedirects> ?y.
     	?x rdfs:label ?label.
     	}
     	FILTER (lang(?label) = 'en')
    }`

    client.query(query, function (error, response, body)
    {
        if (!error)
        {
            let labels = req.body.word + " OR ";
            for (let i = 0; i < 9; i++)
            {
                if (labels.length < 250 && (response.results.bindings[i].label.value.length + labels.length) < 250)
                {
                    labels += response.results.bindings[i].label.value;
                    if (i != 7);
                    {
                        labels += " OR " ;
                    }
                }
            }
            req.body.dbResults = labels;
            next();
        } else
        {
            res.send(JSON.parse(error));
        }
    });
}

//https://www.datamuse.com/api/
exports.getDataMuse = async(req, res, callback) =>
{
    var wordQuery = req.body.word;

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
            var result = {
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

//gets words from the wordsAPI and creates an array out of them
exports.getWordsAPI = async(req, res, callback) =>
{
    var wordQuery = req.body.word;


    if (wordQuery == "" || wordQuery == undefined)
    {
        wordQuery = "crime";
    }

    options =
        {
            method: "GET",
            url: `https://wordsapiv1.p.mashape.com/words/${wordQuery}/hasCategories`,
            headers: {
                'X-Mashape-Key': process.env.WORDSAPIKEY,
                'Accept': 'application/json'
            }
        }

    request(options, function (error, response, body)
    {
        if (!error)
        {
            body = JSON.parse(body);
            let labels = [wordQuery];

            if (!body.hasCategories){
				callback(labels);
			}
			else
			{
                for(var word in body.hasCategories)
                {
					labels.push(body.hasCategories[word]);
                }


                //sort alphabatically because why not
                labels.sort();
                callback(labels);
			}

            return;

        }
    });
}

exports.getCombination = async (req, res, next) =>
{
    var result;
    exports.getDataMuse(req, res, function (dataMuseResults) {


        result = dataMuseResults; //get results from DataMuse

        exports.getWordsAPI(req, res, function(wordsApiResults){ //get results from WordsAPI and start building query to twitter


            result.labels += " OR ";

            for (let i = 0; i < resultLimit; i++)
            {
                if (!/\s/g.test(wordsApiResults[i]))
                {
                    result.labels += wordsApiResults[i];

                    if (i < resultLimit - 1)
                    {
                        result.labels += " OR ";
                    }
                }

                result.words.push(wordsApiResults[i]);
            }
            result.labels += " AND -filter:retweets AND -filter:replies";

            req.body.dbResults = result.labels;
            req.body.words = result.words;


            next();
        })
    });


}

