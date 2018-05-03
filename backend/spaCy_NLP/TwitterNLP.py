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
    # http://144.6.226.34:3000/nte/1000

    dataJson = requests.get('http://localhost:3000/nte').json()
    tweetData = []
    for t in dataJson:
        tweetData.append((str(t['full_text']), str(t['crime']), str(t['type_of_crime'])))

    return tweetData

def loadKeywordTrainingData():
    dataJson = requests.get('http://localhost:3000/nteTrue').json()
    tweetData = []
    for t in dataJson:
        tweetData.append((str(t['full_text']), str(t['crime']), str(t['type_of_crime'])))

    return tweetData

# Loads 5 random checked testing data
def checkData():
    ## TODO:
    # Change the get address to the server address
    # After working more on the backend
    # http://144.6.226.34:3000/nte/5

    # dataJson = requests.get('http://localhost:3000/returnAll').json()
    dataJson = requests.get('http://localhost:3000/nte').json()
    tweetData = []
    for t in dataJson:
        tweetData.append((str(t['full_text']), str(t['crime']), str(t['type_of_crime'])))

    return tweetData

def printOutput(arg):
    # Print output
    cFalse = 0
    cTrue = 0
    JSONres = {}    
    JSONres['predData'] = []

    for (td, pred, keyPred) in zip(testData, pred_data, newPred_data):
        JSONres['predData'].append({
            'Tweet' : td[0],
            'Expected' : td[1],
            'Predicted' : pred,
            'KeywordPred' : keyPred
        })
        # if (arg == True):
        #     if (pred == "True"):
        #         # print('---------------------------')
        #         # print ("Tweet:", td[0], "\nExp:", td[1], "\nPred:", pred, "\nKeyPred:", keyPred)
        #         cTrue += 1
        #     else:
        #         cFalse += 1
        # else:
        #     if (pred == "False"):
        #         # print('---------------------------')
        #         # print ("Tweet:", td[0], "\nExp:", td[1], "\nPred:", pred)
        #         cFalse += 1
        #     else:
        #         cTrue += 1
    print(JSONres)
    print("===========================")
    print ("Accuracy:", accuracy_score([x[1] for x in testData], pred_data))
    print("cFalse:", cFalse)
    print("cTrue:", cTrue)
    print("cTotal:", cTrue + cFalse)

## Main equivalent
# Create vector object and set relevant ngrams
vectorizer = CountVectorizer(tokenizer = spacy_tokenizer, ngram_range=(1,1))
classifier = LinearSVC()

# Creating a piple for predictions
pipe = Pipeline([('cleaner', predictors()),
                 ('vectorizer', vectorizer),
                 ('classifier', classifier)])

# Train and load data
train = loadTrainingData()
keywordTrain = loadKeywordTrainingData()
testData = checkData()

# Fit vector and predict data for Crime
# Imagine like a x,y graph with fit line
pipe.fit([x[0] for x in train], [x[1] for x in train])
pred_data = pipe.predict([x[0] for x in testData])

# Fit vector and predict data for type of crime
pipe.fit([x[0] for x in keywordTrain], [x[2] for x in keywordTrain])
newPred_data = pipe.predict([x[0] for x in testData])
# print(pred_data)
printOutput(True)