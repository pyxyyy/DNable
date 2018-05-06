from flask import redirect
from flask_restful import Resource
import requests


class Edamam(Resource):
    def get(self):
        API_ENDPOINT = "https://api.edamam.com/search"
        # data to be sent to api
        data = {'app_id':"840cb425",
            'api_key':'eed7943359b9eb91b74c4525589aa5cc',
            'q': "chicken",
            'from': "0",
            'to': "3",
            'calories': "591-722",
            'health': "alcohol-free",
            'health': "sugar-conscious"
        }
        # sending post request and saving response as response object
        r = requests.post(url = API_ENDPOINT, data = data)
        return r

