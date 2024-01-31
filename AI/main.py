from flask import Flask, jsonify
from flask_restful import Resource, Api, reqparse
import pandas as pd
from flask_cors import CORS
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import numpy as np
from graphqlclient import GraphQLClient
import json
import math

app = Flask(__name__)

CORS(app)
api = Api(app)

parser = reqparse.RequestParser()
parser.add_argument('data', type=str)  # Define the expected data field

class prediction(Resource):
    def get(self, location, sqft, bhk, bath):
        client = GraphQLClient('https://api.studio.thegraph.com/query/51089/blockchainai/v0.0.1')

        # Define your GraphQL query
        query = '''
        query {
              registeredProperties {
                location
                total_sqft
                bath
                price
                bhk
          }
        }
        '''

        # Execute the query
        result = client.execute(query)

        # Parse the JSON response
        data = json.loads(result)

        # Extract the "tokens" array
        tokens_array = data["data"]["registeredProperties"]

        #load data into a DataFrame object:
        df = pd.DataFrame(tokens_array)

        df10 = pd.read_csv('bhp-final.csv')

        result = pd.concat([df, df10])

        dummies = pd.get_dummies(result.location)

        df11 = pd.concat([result, dummies.drop('Other', axis='columns')], axis='columns')
        df12 = df11.drop('location', axis='columns')

        X = df12.drop(['price'], axis='columns')
        y = df12.price

        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=10)
        lr_clf = LinearRegression()
        lr_clf.fit(X_train, y_train)
        lr_clf.score(X_test, y_test)

        # Check if the location column exists
        if location in X.columns:
            loc_index = np.where(X.columns == location)[0][0]
            x = np.zeros(len(X.columns))
            x[0] = sqft
            x[1] = bath
            x[2] = bhk
            if loc_index >= 0:
                x[loc_index] = 1
                return str(math.floor(lr_clf.predict([x])[0]))
        else:
            return "Location not found in the dataset"

class getData(Resource):
    def get(self):
        df = pd.read_csv('bhp-final.csv')
        res = df.to_json(orient='records')
        return res
    
class getLocation(Resource):
    def get(self):
        client = GraphQLClient('https://api.studio.thegraph.com/query/51089/blockchainai/v0.0.1')

        # Define your GraphQL query
        query = '''
        query {
              registeredProperties {
                location
                total_sqft
                bath
                price
                bhk
          }
        }
        '''

        # Execute the query
        result = client.execute(query)

        # Parse the JSON response
        data = json.loads(result)

        # Extract the "tokens" array
        tokens_array = data["data"]["registeredProperties"]

        #load data into a DataFrame object:
        df = pd.DataFrame(tokens_array)

        df10 = pd.read_csv('bhp-final.csv')

        result = pd.concat([df, df10])

        locations = set(result['location'])
        # return jsonify({"locations": list(locations)})

        sort_location = sorted(locations)

        return list(sort_location)
    
class sendData(Resource):
    def send(self):
        args = parser.parse_args()
        received_data = args['data']
        # Process the received data
        return {'message': 'Data received successfully', 'data': received_data}

api.add_resource(getData, '/api')
api.add_resource(getLocation, '/location')
api.add_resource(prediction, '/prediction/<string:location>/<int:sqft>/<int:bhk>/<int:bath>')
api.add_resource(sendData, '/receive_data')

if __name__ == '__main__':
    app.run(debug=True)