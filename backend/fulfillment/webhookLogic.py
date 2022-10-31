import os
import json


def checkGame(gameName, consoleName):
    script_dir = os.path.dirname(__file__)
    json_path = os.path.join(script_dir, '../data/games.json')
    with open(json_path) as data:
        games = json.load(data)
        print(games)
        for game in games:
            if gameName == game['name']:
                for console in game['consoles']:
                    if console == consoleName:
                        return True

    return False
