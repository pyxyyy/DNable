from flask_restful import Resource, reqparse
import os
from tinydb import TinyDB, Query


class FitbitMessage(Resource):
    def get(self):
        dir_path = os.path.dirname(os.path.realpath(__file__))
        db_path = os.path.join(dir_path, 'db.json')
        db = TinyDB(db_path)

        fitbit_message = Query()
        results = db.search(fitbit_message.object== 'fitbit_message')

        if len(results) == 0:
            return {'message': 'No messages.'}
        else:
            return {'message': results[0].get('message')}

    def post(self):
        # Retrieve parameter message
        parser = reqparse.RequestParser()
        parser.add_argument('message', type=str)
        args = parser.parse_args()
        message = args.get('message')

        dir_path = os.path.dirname(os.path.realpath(__file__))
        db_path = os.path.join(dir_path, 'db.json')
        db = TinyDB(db_path)

        # remove existing row
        existing_row = Query()
        db.remove(existing_row.object == 'fitbit_message')

        # add new row
        db.insert({'object': 'fitbit_message', 'message': message})

        return {}
