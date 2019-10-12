# import sys  # You will get input from node in sys.argv(list)
import json
import pandas as pd
import numpy as np
from fastai.vision import *
import argparse
from sklearn.feature_extraction.text import CountVectorizer
import pickle
from sklearn import svm


def image_prediction(image_path):
	test_src = (ImageList.from_csv("",'cleaned_trinary_test_30.csv', folder='images/25kimages')
	       .split_by_rand_pct(1.0)
	       .label_from_df(label_delim=' '))



	data_test = (test_src.transform(size=256)
	        .databunch(bs=2).normalize(imagenet_stats))



	learn = cnn_learner(data_test, models.resnet18)
	learn=load_learner('')


	    
	y = learn.predict(open_image(image_path),thresh=0.2)
	image_result = y[1].numpy()
	image_prob = y[2].numpy()

	return image_result,image_prob


def rekognition_prediction(object_label):

	with open('model.pickle', 'rb') as saved_model:
		clf_from_pickle = pickle.load(saved_model)

	df = pd.read_csv("cleaned_trinary_training_70.csv")
	df = df[pd.notnull(df['object_labels'])]
	object_labels = df['object_labels']

	count_vect = CountVectorizer()

	X_train_counts = count_vect.fit_transform(object_labels)

	rekog_pred = clf_from_pickle.predict(count_vect.transform([str(object_label)])) 
	rekog_prob = clf_from_pickle.predict_proba(count_vect.transform([object_label]))

	label_dict = {'HighCrime':0, 'LowCrime':1, 'NoCrime': 2} #converting prediction into numeric array
	pred_arr =  [0,0,0]
	pred_arr[label_dict[rekog_pred[0]]] = 1

	return pred_arr,rekog_prob[0]

def svm_combined_model(image_result,rekog_pred):
	filename = 'svm.pkl'
	svm = pickle.load(open(filename, 'rb'))

	x = np.vstack((image_result, rekog_pred)).T
	nx, ny = x.shape
	x = x.reshape((nx*ny))
	result = svm.predict([x])

	return result[0]


def main():
	test_label = 'Human,Person,Gun,Weapon,Weaponry,Military,Military Uniform,Army,Armored,Outdoors,Soldier,Photography,Photo,Standing,Sniper,People'
	parser = argparse.ArgumentParser(description='segmenting')
	parser.add_argument("-p", type=str, action='store', dest='image_path', default="images/test.jpg", help="path to the image")
	parser.add_argument("-l", type=str, action='store', dest='object_label', default=test_label, help="enter rekognition labels")


	results = parser.parse_args()
	image_path = results.image_path
	object_label = results.object_label

	#image_prediction
	image_result,image_prob = image_prediction(image_path)

	#rekog_prediction
	rekog_pred,rekog_prob = rekognition_prediction(object_label)

	#cobined_model_prediction
	result = svm_combined_model(image_result,rekog_pred)

	print(result)


if __name__ == "__main__":
    main()

