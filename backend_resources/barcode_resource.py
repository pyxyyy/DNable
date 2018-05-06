from flask_restful import Resource, reqparse
import json
import requests


class Barcode(Resource):

    APPLICATION_ID = '7b6ae2ba'
    APPLICATION_KEY = '1f71ae4b28b92c851e60204ee74224f9'

    def post(self):
        return self._short_circuit()
        parser = reqparse.RequestParser()
        parser.add_argument('barcode', type=str)
        args = parser.parse_args()
        barcode = args.get('barcode')

        return self._call_nutritionix(barcode)

    def _short_circuit(self):
        return [{'Item': 'Beef Jerky, Chipotle Adobo', 'Serving size': '1 oz', 'Calories': 100, 'Carbohydrate': 8, 'Protein': 10, 'Fat': 3}]

    def _call_nutritionix(self, barcode):
        headers = {
            'Content-Type': 'application/json',
            'x-app-id': self.APPLICATION_ID,
            'x-app-key': self.APPLICATION_KEY
        }
        url = 'https://trackapi.nutritionix.com/v2/search/item'
        params = {
            'upc': barcode
        }
        response = requests.get(url=url, headers=headers, params=params)
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
