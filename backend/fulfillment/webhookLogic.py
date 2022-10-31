import os
import json


def check_game_console(gameName, consoleName):
    script_dir = os.path.dirname(__file__)
    json_path = os.path.join(script_dir, '../data/games.json')
    with open(json_path) as data:
        games = json.load(data)
        for game in games:
            if gameName == game['name']:
                for console in game['consoles']:
                    if console == consoleName:
                        return True

    return False


def check_game_availability(gameName):
    script_dir = os.path.dirname(__file__)
    json_path = os.path.join(script_dir, '../data/games.json')
    with open(json_path) as data:
        games = json.load(data)
        for game in games:
            if gameName == game['name']:
                if game['available']:
                    return True

    return False
