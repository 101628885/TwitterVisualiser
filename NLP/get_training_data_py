import json
import requests
from pprint import pprint

server_url = 'http://144.6.226.34:3000/nlpTrainingEndpoint/100'

response = requests.get(server_url)

data = response.json()

file = open("verified_tweets.json", "w")

with file as outfile:
	json.dump(data, outfile)

file.close()

file = open("tweet_text.txt", "w")

for json in data:
	file.write(json["full_text"].encode('utf8'))
	file.write("\n")

file.close()
