from flask_restful import Resource, reqparse
import requests
import json
import os
from tinydb import TinyDB, Query


class FoodLog(Resource):
    def put(self):
        dir_path = os.path.dirname(os.path.realpath(__file__))
        db_path = os.path.join(dir_path, 'db.json')
        db = TinyDB(db_path)

        # fetch existing row
        existing_row = Query()
        row = db.search(existing_row.object == 'user_nutrition')

        if len