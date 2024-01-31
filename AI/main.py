from pymongo import MongoClient
from flask import Flask, request, jsonify
from flask_restful import Resource, Api, reqparse
import pandas as pd
from flask_cors import CORS
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import numpy as np
from graphqlclient import GraphQLClient
from bson import ObjectId 
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


# Connect to MongoDB
client = MongoClient('mongodb+srv://pratham:blockbusters@cluster0.saiervy.mongodb.net/')
db = client['blockchain']
collection = db['collection']

@app.route('/', methods=['GET'])
def index():
    return "Welcome to the Flask API!"

@app.route('/get_data_by_address', methods=['GET'])
def get_data_by_address():
    # Get the address from the request query parameters
    address = request.args.get('address')

    try:
        # Query MongoDB collection based on the address field
        data_cursor = collection.find({'address': address})

        # Convert MongoDB cursor to a list of dictionaries
        data_list = list(data_cursor)

        # Convert ObjectId fields to strings
        for doc in data_list:
            # Convert ObjectId field to string
            doc['_id'] = str(doc['_id'])

        # Check if any data was found
        if data_list:
            # Return the data as JSON
            return jsonify(data_list)
        else:
            # Return a message if no data was found for the given address
            return jsonify({'message': 'No data found for the provided address.'}), 404
    except Exception as e:
        # Return an error message if an exception occurs
        return jsonify({'error': str(e)}), 500
    
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    try:
        check = collection.find_one({'email': email})

        if check:
            return jsonify("exist")
        else:
            return jsonify("notexist")
    except Exception as e:
        return jsonify("fail")

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')
    age = data.get('age')
    address = data.get('address')
    pin = data.get('pin')
    pan = data.get('pan')
    adhar =data.get('adhar')
    haddress = data.get('haddress')

    data_to_insert = {
        'email': email,
        'password': password,
        'name': name,
        'age': age,
        'address': address,
        'pin': pin,
        'pan': pan,
        'adhar': adhar,
        'haddress': haddress
    }

    try:
        mail = collection.find_one({'email': email})
        add =collection.find_one({'address': address})

        if mail or add:
            return jsonify("exist")
        else:
            collection.insert_one(data_to_insert)
            return jsonify("notexist")
    except Exception as e:
        return jsonify("fail")



if __name__ == '__main__':
    app.run(debug=True)