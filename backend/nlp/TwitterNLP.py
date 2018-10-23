############################
# Team VISION              #
# Software Engineering A/B #
# VisCrime                 #
############################

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
import json
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
    # Endpoint returns Chicago + Melbourne human checked data (true + false)
    dataJson = requests.get('http://43.240.97.166:3000/nlpTraining/5000/checked/true').json()
    tweetData = []
    
    for t in dataJson:
        # data = [str(t['full_text']).replace("#", ""), str(t['crime'])]
        # if ('type_of_crime' in t):
        #     data.append(str(t['type_of_crime']))
        # tweetData.append(data)
        tweetData.append((str(t['full_text']).replace("#", ""), str(t['crime']), str(t['type_of_crime']) if 'type_of_crime'in t else ""))
    
    # print("gg")
    return tweetData

def loadKeywordTrainingData():
    # Endpoint returns Chicago + Melbourne crime true (human checked) data
    # Presuming that checked data have a type_of_crime associated with them
    dataJson = requests.get('http://43.240.97.166:3000/nlpTraining/5000/crime/true').json()
    tweetData = []
    
    # print("data loaded")
    for t in dataJson:
        # data = [str(t['full_text']).replace("#", ""), str(t['crime'])]
        # if ('type_of_crime' in t):
        #     print("found", t['type_of_crime'])
        #     data.append(str(t['type_of_crime']))
        tweetData.append((str(t['full_text']).replace("#", ""), str(t['crime']), str(t['type_of_crime']) if 'type_of_crime'in t else ""))
    
    return tweetData

# Loads 5 random checked testing data
def loadTweetData():
    dataJson = requests.get('http://localhost:3000/nlpTraining').json()
    # print("Tweets loaded")

    tweetData = []
    for t in dataJson:
        tweetData.append((str(t['full_text']), str(t['crime'])))

    return tweetData

def printOutput(arg):
    # Print output
    cTrue = cFalse = 0
    entFound = {}  
    JSONres = {}
    JSONres['predData'] = []

    for (td, pred, keyPred) in zip(tweetData, pred_data, newPred_data):
        if (pred == "True"):
            # print('---------------------------')
            # print ("Tweet:", td[0], "\nPred:", pred, "\nKeyPred:", keyPred)
            # print('+++++++++++++++++++++++++++')
            cTrue += 1
            for i in nlp(td[0]).ents:
                if (i.label_ == 'GPE' or i.label_ == 'LOC'):
                    entFound = {"Location" : "{0}".format(i), "Label" : "{0}".format(i.label_)}
                else:
                    entFound = {}
            JSONres['predData'].append({
                "Tweet" : "{0}".format(td[0]),
                "Expected" : "{0}".format(td[1]),
                "Predicted" : "{0}".format(pred),
                "KeywordPred" : "{0}".format(keyPred),
                "LocationPred" : entFound
            })
        else:
            cFalse += 1
            JSONres['predData'].append({
                "Tweet" : "{0}".format(td[0]),
                "Expected" : "{0}".format(td[1]),
                "Predicted" : "{0}".format(pred),
                "KeywordPred" : "{0}".format(keyPred),
                "LocationPred" : ""
            })
    JSONres['stats'] = [{'False' : cFalse, 'True' : cTrue, 'Total' : cFalse + cTrue}]
    print(json.dumps(JSONres))
    # print("===========================")
    # print ("Accuracy:", accuracy_score([x[1] for x in tweetData], pred_data))
    # print("cFalse:", cFalse)
    # print("cTrue:", cTrue)
    # print("cTotal:", cTrue + cFalse)

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
tweetData = loadTweetData()

# Fit vector and predict data for Crime
# Imagine like a x,y graph with fit line
pipe.fit([x[0] for x in train], [x[1] for x in train])
pred_data = pipe.predict([x[0] for x in tweetData])

# Fit vector and predict data for type of crime
pipe.fit([x[0] for x in keywordTrain], [x[2] for x in keywordTrain])
newPred_data = pipe.predict([x[0] for x in tweetData])
# print(pred_data)
printOutput(True)