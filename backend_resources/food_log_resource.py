from flask_restful import Resource


class FoodLog(Resource):
    def put(self):
        return {'hackhlth': '2018'}