from flask import Flask, jsonify, request
import pandas as pd
from flask_cors import CORS, cross_origin

app = Flask(__name__)

CORS(app)

@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/getAll')
@cross_origin()
def get_all_cats():
    df = pd.read_csv('./catinfo.csv')
    initBreeds = df.to_dict(orient='records')
    breeds = []
    for breed in initBreeds:
        if type(breed['breed']) is str:
            breeds.append(breed)

    return jsonify(breeds)


@app.route('/getFeatureData', methods=['POST'])
@cross_origin()
def get_feature_data():
    feature = request.json['feature']
    df = pd.read_csv('./catinfo.csv')
    initBreeds = df.to_dict(orient='records')
    breeds = []
    for breed in initBreeds:
        if type(breed['breed']) is str:
            breeds.append(breed)
    featureList = ['N/A']
    for breed in breeds:
        if breed[feature].title() not in featureList and type(breed[feature]) is str:
            featureList.append(breed[feature].title())

    return jsonify(featureList)


@app.route('/search', methods=['POST'])
@cross_origin()
def search_cats():
    params = request.json['params']
    df = pd.read_csv('./catinfo.csv')
    initBreeds = df.to_dict(orient='records')
    breeds = []
    for breed in initBreeds:
        if type(breed['breed']) is str:
            breeds.append(breed)

    matches = []

    for breed in breeds:
        match = True
        for key, val in params.items():
            if type(val) is str:
                if val != 'N/A' and breed[key].lower() != val.lower():
                    match = False

            if type(val) is list:
                if len(val) != 0 and breed[key] not in val:
                    match = False

        if (match and type(breed['breed']) is str):
            matches.append(breed)

    return jsonify(matches)


if __name__ == '__main__':
    app.run()
