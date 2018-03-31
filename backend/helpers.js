exports.createTwitterParams = (words) =>
{
	let query = words[0];
	words.splice(0, 1);
	for(word in words)
	{
		query += ` OR ${words[word]}`
	}

	var params = {
			q: query,
			geocode: `-25.2744,133.7751,2000km`,
			count: 100,
			lang: 'en',
			result_type: 'recent',
			tweet_mode: 'extended'
	};

	return params;
}