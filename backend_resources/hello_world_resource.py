from flask import redirect
from flask_restful import Resource


class HelloWorld(Resource):
    def get(self):
        return redirect("http://www.google.com", code=302)
        # return {'hackhlth': '2018'}