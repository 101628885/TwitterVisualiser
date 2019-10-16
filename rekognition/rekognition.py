
#Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
#PDX-License-Identifier: MIT-0 (For details, see https://github.com/awsdocs/amazon-rekognition-developer-guide/blob/master/LICENSE-SAMPLECODE.)

import boto3
import os
import json
from pymongo import MongoClient
import sys

def connect_to_db(url):
    client = MongoClient(url)
    db = client.rekognition
    return db

if __name__ == "__main__":
    
    directory = str(sys.argv[1])
    db_conn = connect_to_db("localhost:27017")
    
    image_no = 0
    
    for file in os.listdir(directory):
        filename = os.fsdecode(file)
        if filename.endswith(".jpg") or filename.endswith(".png"): 
            image_no += 1
            # print(os.path.join(directory, filename))
            
            imageFile=str(os.path.join(directory, filename))
            client=boto3.client(
                'rekognition',
                aws_access_key_id=sys.argv[2],
                aws_secret_access_key=sys.argv[3],
                region_name = "ap-southeast-2")
        
            try:
                with open(imageFile, 'rb') as image:
                    response = client.detect_labels(Image={'Bytes': image.read()})
                    
                img_obj = {
                    "image_id": filename,
                    "lables_with_confidence": {}
                }
                
                for label in response['Labels']:
                    img_obj["lables_with_confidence"][label['Name']] = label['Confidence']
                    # myfile.write('\n"'+label['Name'] + '" : ' + str(label['Confidence']))
                                
                result=db_conn.object_tags.insert(img_obj)
                print(result)
                # move tagged to new folder
                os.rename(str(directory+'/'+filename), str(directory+'/tagged/'+filename))
                
            except:
                print("Error occured with file: " + filename)
            
            
            print(("No. of tagged images:" + str(image_no)))
            # print(("No. of tagged images:" + str(image_no)), end="\r")
        else:
            continue
    print("\n--Done--")