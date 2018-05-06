from flask_restful import Resource, reqparse


class Barcode(Resource):
    def get(self):
        return {'hackhlth': '2018'}