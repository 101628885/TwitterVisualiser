import sys  # You will get input from node in sys.argv(list)
import json
import numpy as np
from fastai.vision import *
import os
import warnings
warnings.filterwarnings(
    "ignore", message="Default grid_sample and affine_grid behavior ")

abspath = os.path.abspath(__file__)
dname = os.path.dirname(abspath)
os.chdir(dname)


def image_prediction(image_path):
    # return os.getcwd(), 0
    test_src = (ImageList.from_csv("", 'images.csv', folder='images')
                .split_none()
                .label_from_df(label_delim=' '))

    data_test = (test_src.transform(size=256)
                 .databunch(bs=1).normalize(imagenet_stats))

    learn = cnn_learner(data_test, models.resnet18)
    learn = load_learner('')

    y = learn.predict(open_image(image_path), thresh=0.2)
    image_result = y[0]
    image_prob = y[2].numpy()

    return image_result, image_prob


def main():

    image_path = sys.argv[1]

    # image_prediction
    image_result, image_prob = image_prediction(image_path)
    image_result =  str(image_result).split(';')[0]

    result = {}
    result["prediction"] = str(image_result)
    result["probability"] = image_prob.tolist()

    print(json.dumps(result))


if __name__ == "__main__":
    main()
