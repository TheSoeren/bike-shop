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
    return send_intent(session_id, text, language)


if __name__ == '__main__':
    app.run()
