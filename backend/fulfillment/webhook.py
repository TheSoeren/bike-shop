from flask import Blueprint, Flask, request

webhook = Blueprint('webhook', __name__)
@webhook.route('/webhook', methods=['GET', 'POST'])
def fulfillment():
    req = request.get_json(silent=True, force=True)
    query_result = req.get('queryResult')
    fulfillmentText = ''

    if query_result.get('action') == 'order.game':
        fulfillmentText = 'works'
        print("yes")
    else:
        fulfillmentText = 'no action'
        print("no")

    return {
        'fulfillmentText': fulfillmentText,
        'source': "webhookdata"
    }