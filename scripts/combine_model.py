import pandas as pd
import numpy as np
from fastai.vision import *
import argparse
from scikit.learn.feature_extraction.text import CountVectorizer


def image_prediction(image_path):
	test_src = (ImageList.from_csv("",'cleaned_trinary_test_30.csv', folder='images/25kimages')
	       .split_by_rand_pct(1.0)
	       .label_from_df(label_delim=' '))



	data_test = (test_src.transform(size=256)
	        .databunch(bs=2).normalize(imagenet_stats))


	learn = create_cnn(data_test, models.resnet18)
	learn=load_learner('')


	    
	y = learn.predict(open_image(image_path),thresh=0.2)
	image_prob = y[2].numpy()

	return y[0],image_prob


def rekognition_prediction(object_label):

	with open('/content/drive/My Drive/Colab Notebooks/dumi_model/model.pickle', 'rb') as saved_model:
    	clf_from_pickle = pickle.load(saved_model)



def main():
	parser = argparse.ArgumentParser(description='segmenting')
	parser.add_argument("-p", type=str, action='store', dest='image_path', default="images/test.jpg", help="path to the image")

	results = parser.parse_args()
	image_path = results.image_path

	#image_prediction
	image_result,image_prob = image_prediction(image_path)

	print(image_result,image_prob)


if __name__ == "__main__":
    main()


