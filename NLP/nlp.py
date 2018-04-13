import nltk
from nltk.tokenize import PunktSentenceTokenizer

sample_data = open("tweet_text.txt", "r").read()

tokenizer = PunktSentenceTokenizer(sample_data)

tokenized_array = tokenizer.tokenize(sample_data) #need a way to parse unicode with nltk...

for word in tokenized_array:
	words = nltk.word_tokenize(word)
	tagged_words = nltk.pos_tag(words)
	regex = r"""Chunk: {<NNP>*<NN>+<VB.?>*<RB.?>}"""
	parser = nltk.RegexpParser(regex)
	chunk = parser.parse(tagged_words)
	chunk.draw()
