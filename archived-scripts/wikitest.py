# Super Junior

import wptools
import json


def searchWiki(search):
    page = wptools.page(search).get_parse()
    if('birth_place' in page.data['infobox']):
        print("birth_place found")
        birth_place = page.data['infobox']['birth_place']
        birth_place = birth_place.replace("[", "").replace("]", "")
        birth_place = birth_place.split("|", 1)[0]
        return birth_place
    elif('hometown' in page.data['infobox']):
        print("hometown found")
        hometown = page.data['infobox']['hometown']
        hometown = hometown.replace("[", "").replace("]", "")
        hometown = hometown.split("|", 1)[0]
        return hometown
    elif('origin' in page.data['infobox']):
        print("origin found")
        origin = page.data['infobox']['origin']
        origin = origin.replace("[", "").replace("]", "")
        origin = origin.split("|", 1)[0]
        return origin
    else:
        return False


search = "Super Junior"
print(searchWiki(search))
