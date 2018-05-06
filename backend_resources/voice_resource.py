from flask_restful import Resource, reqparse


class Voice(Resource):
    def get(self):
        return {'hackhlth': '2018'}