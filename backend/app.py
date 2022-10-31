from flask import Flask, request
from dialogflow.access import send_intent
app = Flask('blockbuster')


@app.route('/communicate')
def communicate():
    session_id = request.args.get('session-id')
    text = request.args.get('text')
    language = request.args.get('language')
    return send_intent(session_id, text, language)


if __name__ == '__main__':
    app.run()
