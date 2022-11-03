from flask import Flask, request
from dialogflow.access import send_intent
from fulfillment.webhook import webhook
from flask_cors import CORS

app = Flask('blockbuster')
app.register_blueprint(webhook)
CORS(app)


@app.route('/communicate')
def communicate():
    session_id = request.args.get('sessionId')
    text = request.args.get('message')
    language = request.args.get('language')
    resp = app.make_response(send_intent(session_id, text, language))
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp


if __name__ == '__main__':
    app.run()
