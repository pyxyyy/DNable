#try calorie mama 500 APIs for $50/mth https://dev.caloriemama.ai/docs

import requests
import json
from PIL import Image
from collections import defaultdict
import os

#download any food image of interest
os.system('wget -O image.jpg https://hips.hearstapps.com/del.h-cdn.co/assets/17/28/1024x683/gallery-1499895381-mussels-tomato-garlic-delish.jpg')

#size image to 544 x 544 px (API req)
#wget
img = Image.open("image.jpg")
img = img.resize((544,544),Image.ANTIALIAS)
img.save("image.jpg")



headers = {
    'Content-Type': 'image/jpeg',
}

params = (
    ('user_key', '369ff477f2803577f25128cab6d4749c')
)

data = open('image.jpg', 'rb').read()

r = requests.post('https://api-2445582032290.production.gw.apicast.io/v1/foodrecognition?user_key=369ff477f2803577f25128cab6d4749c', headers=headers, data=data)
j=json.loads(r.text)
jsonheader=j['results']

#https://dev.caloriemama.ai/docs
#curl -H -i -F media=@image.jpg https://api-2445582032290.production.gw.apicast.io/v1/foodrecognition?user_key=369ff477f2803577f25128cab6d4749c
#curl -request POST -H "Content-Type: image/jpeg" --data-binary ""@image.jpg" https://api-2445582032290.production.gw.apicast.io/v1/foodrecognition?user_key=369ff477f2803577f25128cab6d4749c

#parse json results into dict
foodchoices=dict()
foodnames=list()
score=list()
for i, blob in enumerate(jsonheader):
    foodnutrition = blob['items'][0]['nutrition']
    foodnutrition['portion'] = blob['items'][0]['servingSizes'][0]['unit']
    foodnutrition['score'] = blob['items'][0]['score']
    foodnames.append(blob['items'][0]['name']) #collect names in case duplicated
    score.append(foodnutrition['score']) #json already sorted by score
    foodchoices[foodnames[i]] = foodnutrition

#sort by score
sorted(foodchoices.items(), key=lambda x:x[1]['score'],reverse=True)

#ensure unique foodnames (dictionary req unique keys!)
#get duplicated names by index
# dups = defaultdict(list)
# dropID=list()
# for i, name in enumerate(foodnames):
#     dups[name].append(i)
# for k, v in sorted(dups.iteritems()):
#     if len(v) >= 2:
#         dropID.append(v[1:])
#
# #remove duplicates
# if len(dropID)>0:
#     map(foodchoices.__delitem__, filter(foodchoices.__contains__,dropID))
# foodchoices.keys() = [v for i,v in enumerate(foodnames) if i not in dropID]

