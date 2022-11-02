import os
import json


def check_game_console(game_name, console_name):
    script_dir = os.path.dirname(__file__)
    json_path = os.path.join(script_dir, '../data/games.json')
    with open(json_path) as data:
        games = json.load(data)
        for game in games:
            if game_name == game['name']:
                for console in game['consoles']:
                    if console == console_name:
                        return True

    return False


def check_game_availability(game_name):
    script_dir = os.path.dirname(__file__)
    json_path = os.path.join(script_dir, '../data/games.json')
    with open(json_path) as data:
        games = json.load(data)
        for game in games:
            if game_name == game['name']:
                if game['available']:
                    return True

    return False
