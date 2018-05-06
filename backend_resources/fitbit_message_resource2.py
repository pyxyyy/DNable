from flask_restful import Resource
import os
from tinydb import TinyDB, Query


class FitbitMessage2(Resource):
    def post(self, message):
        dir_path = os.path.dirname(os.path.realpath(__file__))
        db_path = os.path.join(dir_path, 'db.json')
        db = TinyDB(db_path)

        # remove existing row
        existing_row = Query()
        db.remove(existing_row.object == 'fitbit_message')

        # add new row
        db.insert({'object': 'fitbit_message', 'message': message})

        return {}

