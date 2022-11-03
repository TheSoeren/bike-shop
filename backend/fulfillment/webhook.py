from flask import Blueprint, request
from fulfillment.webhookLogic import check_game_console, check_game_availability, check_customer_nr
import os
from string import Template
import json

webhook = Blueprint('webhook', __name__)


@webhook.route('/webhook', methods=['GET', 'POST'])
def fulfillment():
    req = request.get_json(silent=True, force=True)
    query_result = req.get('queryResult')
    fulfillment_text = ''

    if query_result.get('action') == 'order.game':
        fulfillment_text = fulfill_game_console(query_result)
    elif query_result.get('action') == 'order.game-yes':
        fulfillment_text = fulfill_game_availability(query_result)
    elif query_result.get('action') == 'request.rented_games':
        fulfillment_text = fulfill_customer_nr(query_result)

    return {
        'fulfillmentText': fulfillment_text,
        'source': "webhookdata"
    }


def load_json():
    script_dir = os.path.dirname(__file__)
    json_path = os.path.join(script_dir, 'texts.json')
    with open(json_path, 'r') as json_file:
        return json.load(json_file)


def fulfill_game_console(query_result):
    language_code = query_result['languageCode']
    game = query_result.get('parameters').get('game')
    console = query_result.get('parameters').get('console')
    texts = load_json()
    if check_game_console(game, console):
        if language_code == 'en':
            return texts['check_console']['en']['success'].replace('$game$', game).replace('$console$', console)
        else:
            return texts['check_console']['de']['success'].replace('$game$', game).replace('$console$', console)
    else:
        if language_code == 'en':
            return texts['check_console']['en']['failure'].replace('$game$', game).replace('$console$', console)
        else:
            return texts['check_console']['de']['failure'].replace('$game$', game).replace('$console$', console)


def fulfill_game_availability(query_result):
    language_code = query_result['languageCode']
    game = query_result.get('outputContexts')[0].get('parameters').get('game')
    texts = load_json()
    if check_game_availability(game):
        if language_code == 'en':
            return texts['check_availability']['en']['success'].replace('$game$', game)
        else:
            return texts['check_availability']['de']['success'].replace('$game$', game)
    else:
        if language_code == 'en':
            return texts['check_availability']['en']['failure'].replace('$game$', game)
        else:
            return texts['check_availability']['de']['failure'].replace('$game$', game)


def fulfill_customer_nr(query_result):
    language_code = query_result['languageCode']
    texts = load_json()
    customer_nr = query_result.get('parameters').get('customer-nr')
    customer_games = check_customer_nr(customer_nr)
    if customer_games == -1:
        if language_code == 'en':
            return texts['check_customer_nr']['en']['failure']
        else:
            return texts['check_customer_nr']['de']['failure']
    elif not customer_games:
        if language_code == 'en':
            return texts['check_customer_nr']['en']['empty']
        else:
            return texts['check_customer_nr']['de']['empty']
    else:
        text = ''
        if language_code == 'en':
            text = texts['check_customer_nr']['en']['success']
        else:
            text = texts['check_customer_nr']['de']['success']
        for game in customer_games:
            text += f"{game}, "
        return text
