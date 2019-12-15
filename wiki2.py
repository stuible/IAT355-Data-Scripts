# Uses a python Wiki scraper to fix the  incomplete Origin Data filled in by the Node Wikipedia Scraper

import wptools
import json


def getWiki(search):
    print("Search Term: " + search)
    try:
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
    except:
        return False


def getArtistOrigin(artist):
    attempt1 = getWiki(artist)
    if(attempt1 == False):
        attempt2 = getWiki(artist + " (band)")
        if(attempt2 == False):
            attempt3 = getWiki(artist + " (musician)")
            if(attempt3 == False):
                attempt4 = getWiki(artist + " (rapper)")
                if(attempt4 == False):
                    attempt5 = getWiki(artist + " (singer)")
                    if(attempt5 == False):
                        return getWiki(artist + " (artist)")
                    else:
                        return attempt5
                else:
                    return attempt4
            else:
                return attempt3
        else:
            return attempt2
    else:
        return attempt1

def updateArtist(newOrigin, artist):
    print("updatng artist")
    with open('output/wiki/spotify/artist-realOrigin.json') as data_file:
        # print("opened new file")
        data = json.load(data_file)
        try:
            artistIndex = [x["spotifyArtistName"] for x in data].index(artist)
            data[artistIndex]["realOrigin"] = newOrigin
            with open('output/wiki/spotify/artist-realOrigin.json', 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=4)
        except:
            pass


def hasRealOrigin(artist):
    with open('output/wiki/spotify/artist-realOrigin.json') as data_file:
        # print("opened new file")
        data = json.load(data_file)
        # predicate = lambda x: x["spotifyArtistName"] == artist
        try:
            artistIndex = [x["spotifyArtistName"] for x in data].index(artist)
            if("realOrigin" in data[artistIndex]):
                return True
            else:
                return False
        except:
            return False
        

with open('output/wiki/spotify/artists.json') as data_file:
    data = json.load(data_file)
    for artist in data:
        if(hasRealOrigin(artist["spotifyArtistName"])):
            print("Already have this artists real info")
        else :
            actualOrigin = getArtistOrigin(artist["spotifyArtistName"])
            if(actualOrigin != False):
                print("Found Origin: " + actualOrigin)
                updateArtist(actualOrigin, artist["spotifyArtistName"])
            else:
                print("Could not find Origin")
                updateArtist("undefined", artist["spotifyArtistName"])
