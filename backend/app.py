from flask import Flask, request
from dialogflow.access import send_intent
from fulfillment.webhook import webhook

app = Flask('blockbuster')
app.register_blueprint(webhook)


@app.route('/communicate')
def communicate():
    session_id = request.args.get('session-id')
    text = request.args.get('text')
    language = request.args.get('language')
    return send_intent(session_id, text, language)


if __name__ == '__main__':
    app.run()
