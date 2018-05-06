from flask_restful import Resource, reqparse
import requests
import json


class VoiceProcessing(Resource):

    NUTRITIONIX_APPLICATION_ID = '7b6ae2ba'
    NUTRITIONIX_APPLICATION_KEY = '1f71ae4b28b92c851e60204ee74224f9'

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('food', type=str)
        args = parser.parse_args()
        message = args.get('food')

        return self._call_nutritionix(message)

    def _short_circuit(self):
        return [{'Protein': 62.04, 'Serving size': '200 grams', 'Carbohydrate': 0, 'Fat': 7.14, 'Item': 'chicken breast', 'Calories': 330}, {'Protein': 2.38, 'Serving size': '100 grams', 'Carbohydrate': 7.18, 'Fat': 0.41, 'Item': 'brocolli', 'Calories': 35}]

    def _call_nutritionix(self, message):
        headers = {
            'Content-Type': 'application/json',
            'x-app-id': self.NUTRITIONIX_APPLICATION_ID,
            'x-app-key': self.NUTRITIONIX_APPLICATION_KEY
        }
        url = 'https://trackapi.nutritionix.com/v2/natural/nutrients'
        body = {
            "query": message
        }
        response = requests.post(url=url, headers=headers, json=body)
        content = json.loads(response.content.decode('utf-8')).get('foods')

        results = []

        for item in content:
            results.append({
                'Item': item.get('food_name'),
                'Serving size': '{} {}'.format(item.get('serving_qty'), item.get('serving_unit')),
                'Calories': item.get('nf_calories'),
                'Carbohydrate': item.get('nf_total_carbohydrate'),
                'Protein': item.get('nf_protein'),
                'Fat': item.get('nf_total_fat')
            })

        return results
