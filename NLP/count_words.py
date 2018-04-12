import nltk
import codecs
import string

from nltk.tokenize import RegexpTokenizer
from nltk.corpus import stopwords

word_tokenizer = RegexpTokenizer(r'\w+')

sample_data = codecs.open('tweet_text.txt', 'r', 'utf-8-sig')

stop_words = set(stopwords.words('english'))

token_array = word_tokenizer.tokenize(sample_data.read())

filtered_token_array = [token for token in token_array if not token in stop_words]

word_dict = {}

for token in filtered_token_array:
	if token in word_dict:
		word_dict[token] += 1
	else:
		word_dict[token] = 1

for token, count in sorted(word_dict.iteritems(), key=lambda (k,v): (v,k)):
	if count > 5:
		print "%s: %s" % (token, count)
