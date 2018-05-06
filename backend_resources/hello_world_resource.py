from flask import redirect
from flask_restful import Resource


class HelloWorld(Resource):
    def get(self):
        return {'hackhlth': '2018'}