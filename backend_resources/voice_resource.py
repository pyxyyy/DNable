from flask_restful import Resource, reqparse
import requests
import json


class VoiceProcessing(Resource):

    APPLICATION_ID = '08a406db'
    APPLICATION_KEY = 'ce2b4b499aa0b4ea891aadb62e681d44'

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('food', type=str)
        args = parser.parse_args()
        message = args.get('food')

        return self._call_nutritionix(message)

    def _call_nutritionix(self, message):
        headers = {
            'Content-Type': 'application/json',
            'x-app-id': self.APPLICATION_ID,
            'x-app-key': self.APPLICATION_KEY
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
                'Serving size': '{} {}'.format(item.get('serving_qty'), item.get('serving_unit'))
            })

        return results
