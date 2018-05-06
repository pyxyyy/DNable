from flask_restful import Resource, reqparse
from PIL import Image
import requests
import json
import werkzeug


class ImageProcessing(Resource):
    def post(self):

        # short circuit
        return self._short_circuit()
        parser = reqparse.RequestParser()
        parser.add_argument('image', location='files', type=werkzeug.FileStorage)
        args = parser.parse_args()
        args.get('image').save('unprocessed_image.jpg')
        unprocessed_image = Image.open("unprocessed_image.jpg")
        img = unprocessed_image.resize((544, 544), Image.ANTIALIAS)
        img.save("image.jpg")
        data = open('image.jpg', 'rb').read()

        return self._call_calorie_mama(data)

    def _short_circuit(self):
        return [{'Item': 'Sliced Turkey', 'Serving size': '100 g', 'Calories': 1000, 'Carbohydrate': 0.023399999999999997, 'Protein': 0.16329999999999997, 'Fat': 0.023700000000000002}, {'Item': 'Swiss Cheese', 'Serving size': '1 cup, diced', 'Calories': 1790, 'Carbohydrate': 0.034, 'Protein': 0.284, 'Fat': 0.051}, {'Item': 'Ravioli', 'Serving size': '9 pieces', 'Calories': 1785.714286, 'Carbohydrate': 0.2285714286, 'Protein': 0.07142857142999999, 'Fat': 0.06428571429}]

    def _call_calorie_mama(self, data):
        headers = {
            'Content-Type': 'image/jpeg',
        }
        r = requests.post(
            url='https://api-2445582032290.production.gw.apicast.io/v1/foodrecognition?user_key=91415063a5b1ab6f6332e5469936aa9d',
            headers=headers,
            data=data)

        response_content = json.loads(r.content.decode('utf-8')).get('results')

        # parse results
        results = []
        for item in response_content:
            for inner_items in item.get('items'):
                serving_sizes = inner_items.get('servingSizes')
                if len(serving_sizes) > 1:
                    sorted_serving_sizes = sorted(serving_sizes, key=lambda k: k.get('servingWeight', 0), reverse=True)
                    serving_size = sorted_serving_sizes[0]
                else:
                    serving_size = serving_sizes[0]
                results.append({
                    'Item Type': inner_items.get('group'),
                    'Item': inner_items.get('name'),
                    'Serving size': serving_size.get('unit'),
                    'Score': inner_items.get('score'),
                    'Calories': inner_items.get('nutrition').get('calories'),
                    'Carbohydrate': inner_items.get('nutrition').get('totalCarbs'),
                    'Protein': inner_items.get('nutrition').get('protein'),
                    'Fat': inner_items.get('nutrition').get('totalFat')
                })

        sorted_results = sorted(results, key=lambda k: k['Score'], reverse=True)
        top3_results = sorted_results[0:3]

        for top3_result in top3_results:
            del top3_result['Item Type']
            del top3_result['Score']

        return top3_results


