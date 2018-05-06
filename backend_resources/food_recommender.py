from backend_resources.nutneeds import run
from flask_restful import Resource


class FoodRecommender(Resource):
    def get(self):
        results = run()
        return results
