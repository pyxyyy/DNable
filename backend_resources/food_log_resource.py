from flask_restful import Resource, reqparse
import requests
import json
import os
from tinydb import TinyDB, Query
import datetime


class FoodLog(Resource):

    NUTRITIONIX_APPLICATION_ID = '7b6ae2ba'
    NUTRITIONIX_APPLICATION_KEY = '1f71ae4b28b92c851e60204ee74224f9'
    FITBIT_CLIENT_ID = '22CRYQ'
    FITBIT_CLIENT_SECRET = '58ba9d3f718065db7728165769eb9bb5'

    def put(self):
        dir_path = os.path.dirname(os.path.realpath(__file__))
        db_path = os.path.join(dir_path, 'db.json')
        db = TinyDB(db_path)

        parser = reqparse.RequestParser()
        # parser.add_argument('Items', type=dict, action='append')
        parser.add_argument('item', type=str)
        parser.add_argument('size', type=str)
        args = parser.parse_args()
        arg_item = args.get('item')
        arg_serving_size = args.get('size')
        # arg_items = args.get('Items')

        # Get values from nutrition IX
        values_to_be_added = {
            'calories': 0,
            'carbohydrates': 0,
            'proteins': 0,
            'fats': 0,
            'sugar': 0,
            'alcohol': 0,
            'iron': 0,
            'saturated fats': 0
        }

        # item and serving size is passed
        # if arg_items is None:
        if True:
            query = '{} of {}'.format(arg_serving_size, arg_item)
            values_to_be_added = self._call_nutritionix_api(values_to_be_added, query, arg_item)
        else:
            # for item in arg_items:
            #     query = '{} of {}'.format(item.get('Serving size'), item.get('Item'))
            #     values_to_be_added = self._call_nutritionix_api(values_to_be_added, query, item.get('Item'))
            pass

        # fetch existing row
        existing_row = Query()
        rows = db.search(existing_row.object == 'user_nutrition')

        current_values = {}

        if len(rows) > 0:
            row = rows[0]
            nutrition_values = row.get('nutrition_values')
            current_values = nutrition_values

        new_values = {
            'calories': current_values.get('calories', 0) + values_to_be_added.get('calories'),
            'carbohydrates': current_values.get('carbohydrates', 0) + values_to_be_added.get('carbohydrates'),
            'proteins': current_values.get('proteins', 0) + values_to_be_added.get('proteins'),
            'fats': current_values.get('fats', 0) + values_to_be_added.get('fats'),
            'sugar': current_values.get('sugar', 0) + values_to_be_added.get('sugar'),
            'alcohol': current_values.get('alcohol', 0) + values_to_be_added.get('alcohol'),
            'iron': current_values.get('iron', 0) + values_to_be_added.get('iron'),
            'saturated fats': current_values.get('saturated fats', 0) + values_to_be_added.get('saturated fats')
        }

        # delete existing row
        db.remove(existing_row.object == 'user_nutrition')

        # insert new row
        db.insert({'object': 'user_nutrition', 'nutrition_values': new_values})

        return new_values

    def _call_fitbit_api(self, item, nutritional_values):
        dir_path = os.path.dirname(os.path.realpath(__file__))
        db_path = os.path.join(dir_path, 'db.json')
        db = TinyDB(db_path)

        UserID = Query()
        user_id_results = db.search(UserID.object == 'user_id')
        AccessToken = Query()
        access_token_results = db.search(AccessToken.object == 'access_token')

        user_id = user_id_results[0].get('user_id')
        access_token = access_token_results[0].get('access_token')
        headers = {'Authorization': 'Bearer {}'.format(access_token)}

        url = 'https://api.fitbit.com/1/user/%s/foods/log.json' % user_id
        food_entry = {
            "foodName": item,
            "mealTypeId": 7,
            "unitId": 304,
            "unit": {"id": 304, "name": "serving", "plural": "servings"},
            "amount": 1,
            "date": datetime.datetime.now().strftime('%Y-%m-%d'),
            "calories": nutritional_values.get('calories'),
            "carbs": nutritional_values.get('carbohydrates'),
            "fat": nutritional_values.get('fats'),
            "protein": nutritional_values.get('proteins')
        }
        response = requests.post(url, data=food_entry, headers=headers)
        content = json.loads(response.content.decode('utf-8'))
        return content

    def _call_nutritionix_api(self, current_values, query, item):
        headers = {
            'Content-Type': 'application/json',
            'x-app-id': self.NUTRITIONIX_APPLICATION_ID,
            'x-app-key': self.NUTRITIONIX_APPLICATION_KEY
        }
        url = 'https://trackapi.nutritionix.com/v2/natural/nutrients'
        body = {
            "query": query
        }
        import logging

        logging.debug("AHHHHH {}".format(query))
        response = requests.post(url=url, headers=headers, json=body)
        content = json.loads(response.content.decode('utf-8')).get('foods')

        iron_value = 0
        alcohol_valuie = 0

        full_nutrients = content[0].get('full_nutrients')
        for nutrient in full_nutrients:
            # IRON
            if nutrient.get('attr_id') == 303:
                iron_value = nutrient.get('value')
            # ALCOHOL
            if nutrient.get('attr_id') == 221:
                alcohol_valuie = nutrient.get('value')

        self._call_fitbit_api(item, {
            'calories': content[0].get('nf_calories'),
            'carbohydrates': content[0].get('nf_total_carbohydrate'),
            'proteins': content[0].get('nf_protein'),
            'fats': content[0].get('nf_total_fat')
        })

        return {
            'calories': current_values.get('calories', 0) + content[0].get('nf_calories'),
            'carbohydrates': current_values.get('carbohydrates', 0) + content[0].get('nf_total_carbohydrate'),
            'proteins': current_values.get('proteins', 0) + content[0].get('nf_protein'),
            'fats': current_values.get('fats', 0) + content[0].get('nf_total_fat'),
            'sugar': current_values.get('sugar', 0) + content[0].get('nf_sugars'),
            'alcohol': current_values.get('alcohol', 0) + alcohol_valuie,
            'iron': current_values.get('iron', 0) + iron_value,
            'saturated fats': current_values.get('saturated fats', 0) + content[0].get('nf_saturated_fat')
        }