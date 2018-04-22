# spaCy essentials
import spacy
from spacy.lang.en import English
nlp = spacy.load('en')

# import from scikit
from sklearn.feature_extraction.stop_words import ENGLISH_STOP_WORDS as stopwords 
from sklearn.feature_extraction.text import CountVectorizer 
from sklearn.metrics import accuracy_score 
from sklearn.base import TransformerMixin 
from sklearn.pipeline import Pipeline
from sklearn.svm import LinearSVC

# import for HTTP GET
import requests

# For punctutation checking
import string
punc = string.punctuation

parser = English()

# clean the passed text
def text_clean(text):
    return text.strip().lower()

# Transformer using type TransformerMixin from scikit
# Used for Vector fittings
class predictors(TransformerMixin):
    def transform(self, X, **transform_params):
        return [text_clean(text) for text in X]

    def fit(self, X, y=None, **fit_params):
        return self

    def get_params(self, deep=True):
        return {}

# Create spacy tokenizer that parses a sentence and generates tokens
def spacy_tokenizer(sentence):
    tokens = parser(sentence)
    tokens = [tok.lemma_.lower().strip() if tok.lemma_ != "-PRON-" else tok.lower_ for tok in tokens]
    tokens = [tok for tok in tokens if (tok not in stopwords and tok not in punc)]
    
    return tokens

# Loads 1000 training data from source
def loadTrainingData():
    ## TODO:
    # Change the get address to the server address
    # After working more on the backend
    # http://144.6.226.34:3000/nlpTrainingEndpoint/1000

    dataJson = requests.get('http://localhost:3000/nlpTrainingEndpoint/1000').json()
    tweetData = []
    for t in dataJson:
        tweetData.append((str(t['full_text']), str(t['crime'])))

    return tweetData

# Loads 5 random checked testing data
def checkData():
    ## TODO:
    # Change the get address to the server address
    # After working more on the backend
    # http://144.6.226.34:3000/nlpTrainingEndpoint/5

    dataJson = requests.get('http://localhost:3000/nlpTrainingEndpoint/5').json()
    tweetData = []
    for t in dataJson:
        tweetData.append((str(t['full_text']), str(t['crime'])))

    return tweetData

# Create vector object and set relevant ngrams
vectorizer = CountVectorizer(tokenizer = spacy_tokenizer, ngram_range=(1,1))
classifier = LinearSVC()

pipe = Pipeline([('cleaner', predictors()),
                 ('vectorizer', vectorizer),
                 ('classifier', classifier)])

train = loadTrainingData()
test = checkData()

# Fit vector and predict data
# Imagine like a x,y graph with fit line
pipe.fit([x[0] for x in train], [x[1] for x in train]) 
pred_data = pipe.predict([x[0] for x in test]) 

# Print output
for (sample, pred) in zip(test, pred_data):
    print('---------------------------')
    print ("Tweet:", sample[0], "\nExp:", sample[1], "\nPred:", pred)

print("==================")
print ("Accuracy:", accuracy_score([x[1] for x in test], pred_data))