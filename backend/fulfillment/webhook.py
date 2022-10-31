from flask import Blueprint, request
from fulfillment.webhookLogic import checkGame

webhook = Blueprint('webhook', __name__)
@webhook.route('/webhook', methods=['GET', 'POST'])
def fulfillment():
    req = request.get_json(silent=True, force=True)
    query_result = req.get('queryResult')
    fulfillmentText = ''

    if query_result.get('action') == 'order.game':
        game = query_result.get('parameters').get('game')
        console = query_result.get('parameters').get('console')
        if checkGame(game, console):
            fulfillmentText = f"You wish to rent {game} for {console}, is that right?"
        else:
            fulfillmentText = f"The game {game} is not available on {console}. Please try again."
    return {
        'fulfillmentText': fulfillmentText,
        'source': "webhookdata"
    }
