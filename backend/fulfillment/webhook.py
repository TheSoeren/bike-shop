from flask import Blueprint, request
from fulfillment.webhookLogic import check_game_console, check_game_availability, check_customer_nr

webhook = Blueprint('webhook', __name__)


@webhook.route('/webhook', methods=['GET', 'POST'])
def fulfillment():
    # extract request parameters
    req = request.get_json(silent=True, force=True)
    query_result = req.get('queryResult')
    fulfillment_text = ''

    # complete fulfillment for order.game action
    if query_result.get('action') == 'order.game':
        game = query_result.get('parameters').get('game')
        console = query_result.get('parameters').get('console')
        if check_game_console(game, console):
            fulfillment_text = f"You wish to rent {game} for {console}, is that right?"
        else:
            fulfillment_text = f"The game {game} is not available on {console}. Please try again."

    # complete fulfillment for order.game-yes action
    if query_result.get('action') == 'order.game-yes':
        game = query_result.get('outputContexts')[0].get('parameters').get('game')
        if check_game_availability(game):
            fulfillment_text = f"We still have {game} in stock! Pick it up in our opening hours."
        else:
            fulfillment_text = f"The game {game} is currently not in stock. Please try again at a later time. "

    #complete fulfillment for request.rented_games action
    if query_result.get('action') == 'request.rented_games':
        customer_nr = query_result.get('parameters').get('customer-nr')
        customer_games = check_customer_nr(customer_nr)
        if customer_games == -1:
            fulfillment_text = f"Your customer number could not be recognized, please try again"
        elif not customer_games:
            fulfillment_text = f"You currently have no games rented."
        else:
            fulfillment_text = f"You have the following games rented: \n"
            for game in customer_games:
                fulfillment_text += f"{game}, \n"

    return {
        'fulfillmentText': fulfillment_text,
        'source': "webhookdata"
    }
