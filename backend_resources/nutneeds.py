
import pandas as pd
from nutritionix import *

df_nut=pd.read_table('/Users/A267512/Desktop/feat.txt').fillna(0)
df_nut.head()

#hard coded to simulate a certain user
sex='Female'
age=50
condition='0'
height=5*12+5
weight=200

#compute bmi for calorie adjustment
bmi=1.0*weight/height/height*703
if bmi > 30:
    calorie_deficit = 400
elif bmi > 25:
    calorie_deficit = 200
else:
    calorie_deficit = 0

#lookup nutritional goals based on condition, age, sex
nut_goals=df_nut[(df_nut.condition==condition) & (df_nut.sex==sex) & (df_nut.Age_min<=age) & (df_nut.Age_max>=age)].T.to_dict().values()[0]
nut_goals['208']=nut_goals['208']-calorie_deficit

#create fake nutritional_total based on 70% of goals
#nutrients have keys that are completely in digits
nut_total_current={k:0.7*v for k,v in nut_goals.items() if k.isdigit()}

#Add a donut
j=0 #pick just the first one
eaten=quick_food_search('donut',common=True,brand=False,self=True)
eaten.values()[0][j]['food_name']
food_nut=eaten.values()[0][j]['full_nutrients']
#parse output into a dict
food_nut_dict={}
for i in range(0,len(food_nut)):
    food_nut_dict[str(food_nut[i]['attr_id'])]=food_nut[i]['value']


#tally up nutrients
for k, v in nut_total_current.items():
    if k in food_nut_dict.keys():
        nut_total_current[k] = v + food_nut_dict[k]
        nut_balance[k] = nut_goals[k] - nut_total_current[k]


nut_balance = nut_goals - nut_total_current


#to search food by nutrient thresholds
food_threshold={"208": {"lte":500},
                "291": {"gte": 5}}
filtered_search('orange',food_threshold)

#to search 20 nearby restaurants by lat, long
r=restaurant_lookup('36.1073,-115.1766',radius='1km',measure='point_distance')
restaurants=[i['name'] for i in r]
brand_id_list=[i['brand_id'] for i in r]

#to search menu items in nearby restaurants from above
filtered_search('burger',food_threshold, brand_id_list=brand_id_list)

