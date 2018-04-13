const sparql = require('sparql')
const request = require('request')

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
exports.getDataMuse = async(req,res, next) => 
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
			//res.send(body);
			let words = []
			let labels = wordQuery + " OR ";
			words.push(wordQuery);
			for (let i = 0; i < 8; i++)
			{
				if (body == "[]")
				{
					console.log("Empty response from DataMuse...");
					break;
				}
				
				labels += JSON.parse(body)[i].word;
				words.push(JSON.parse(body)[i].word);
				console.log(i + ": "+ labels);
				if (i != 7)
				{
					labels += " OR " ;
				} 
			}
			req.body.words = words
	    	req.body.dbResults = labels + " AND -filter:retweets AND -filter:replies";
	    	next();
	  	} else 
	  	{
	  		res.send(JSON.parse(error));
	  	}
	});
}

//gets words from the wordsAPI and creates an array out of them
exports.getWordsAPI = async(req,res, next) => 
{
	var wordQuery = req.body.word;

	if (wordQuery == "" || wordQuery == undefined)
	{
		wordQuery = "crime";
	}

    options =
        {
            method: "GET",
            url: `https://wordsapiv1.p.mashape.com/words/${wordQuery}`,
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
			let words = [wordQuery]
			//get words in the 'hasCatergories' array and add to words array
			for(let word in body.results[0].hasCategories)
			{
				words.push(body.results[0].hasCategories[word])
			}

			//get words in the 'hasCatergories' array
			for(let word in body.results[0].hasCategories)
			{
				//make sure there is no duplicate words added to words array
				if(words.indexOf(body.results[0].hasCategories[word]) == -1)
				{
					words.push(body.results[0].hasCategories[word])
				}
			}
			//sort alphabatically because why not 
			words.sort();

			req.body.words = words
			next();
			
		}
	});
}

