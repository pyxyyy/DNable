from flask import Flask
from flask_restful import Api

from backend_resources.hello_world_resource import HelloWorld
from backend_resources.fitbit_message_resource import FitbitMessage
from backend_resources.oauth_resource import OauthResource
from backend_resources.edamam_resource import Edamam
from backend_resources.image_resource import ImageProcessing
from backend_resources.voice_resource import VoiceProcessing
from backend_resources.barcode_resource import Barcode

app = Flask(__name__)
api = Api(app)


@app.route("/account_linked")
def hello():
    return "<h1 align=\"center\">Congratulations! You have successfully linked your " \
           "<span style=\"color:00B0B9;\">fitbit</span> account.</h1>" \
           "<h2 align=\"center\">Please close this window to continue.</h2>"


@app.route("/peixuan")
def peixuan():
    return "<div>What's up</div>"


api.add_resource(HelloWorld, '/')
api.add_resource(OauthResource, '/oauth', )
api.add_resource(FitbitMessage, '/fitbit_message')
api.add_resource(ImageProcessing, '/image')
api.add_resource(VoiceProcessing, '/voice')
api.add_resource(Edamam, '/edamam')
api.add_resource(Barcode, '/barcode')

if __name__ == '__main__':
    app.run(host='0.0.0.0')
