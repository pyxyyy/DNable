from flask import redirect
from flask_restful import Resource
import requests
import json


class Edamam(Resource):
    def get(self):
        API_ENDPOINT = "https://api.edamam.com/search"
        # data to be sent to api
        data = {
            'app_id':"840cb425",
            'app_key':'eed7943359b9eb91b74c4525589aa5cc',
            'q': "chicken",
            'from': "0",
            'to': "3",
            'calories': "591-722",
            'health': "alcohol-free",
            'health': "sugar-conscious"
        }
        # sending post request and saving response as response object
        r = requests.post(url = API_ENDPOINT, data = data)
        if r.status_code > 400:
            return {'repsonse': r.content.decode('utf-8')}
        else:
            return json.loads(r.content)

