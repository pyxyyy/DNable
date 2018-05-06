from flask import redirect
from flask_restful import Resource, reqparse

import json
import requests
from urllib.parse import urlencode
import base64


class OauthResource(Resource):

    FITBIT_CLIENT_ID = '22CRYQ'
    FITBIT_CLIENT_SECRET = '58ba9d3f718065db7728165769eb9bb5'
    FITBIT_OAUTH_URL = 'https://api.fitbit.com/oauth2/token'

    def get(self):
        # Retrieve url params
        parser = reqparse.RequestParser()
        parser.add_argument('code', type=str)
        args = parser.parse_args()
        authorization_code = args.get('code')

        # Exchange authorization code for access tokens
        header = {
            'Authorization': 'Basic {}'.format(self._get_fitbit_authorization()),
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        body = {
            'client_id': self.FITBIT_CLIENT_ID,
            'grant_type': 'authorization_code',
            'redirect_uri': 'http://ec2-13-57-254-109.us-west-1.compute.amazonaws.com/oauth',
            'code': authorization_code
        }
        response = requests.post(url=self.FITBIT_OAUTH_URL, headers=header, data=urlencode(body))
        response_content = json.loads(response.content)

        # Store access and refresh tokens


        # redirect to account linked page
        return redirect("http://ec2-13-57-254-109.us-west-1.compute.amazonaws.com/account_linked", code=302)

    def post(self):
        """
         
        """

    def _get_fitbit_authorization(self):
        credentials = '{}:{}'.format(self.FITBIT_CLIENT_ID, self.FITBIT_CLIENT_SECRET).encode()
        return base64.b64encode(credentials).decode('utf-8')