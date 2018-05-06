from flask_restful import Resource


class FitbitMessage(Resource):
    def get(self):
        return {'message': 'Your fitbit app has an update.'}