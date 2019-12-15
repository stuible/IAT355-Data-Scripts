import wptools
import json


def updateArtist(newOrigin, artist):
    print("updatng artist")
    with open('output/wiki/spotify/artists.json') as data_file:
        # print("opened new file")
        data = json.load(data_file)
        # predicate = lambda x: x["spotifyArtistName"] == artist
        artistIndex = [x["spotifyArtistName"] for x in data].index(artist)
        # print("FOUND TEH ARTIST INDEX:")
        # print(artistIndex)
        data[artistIndex]["realOrigin"] = newOrigin
        # print(data[artistIndex])
        with open('output/wiki/spotify/artists.json', 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=4)


def getWiki(search, artist):
    print("Search Term: " + search)
    try:
        page = wptools.page(search).get_parse()
        if('birth_place' in page.data['infobox']):
            birth_place = page.data['infobox']['birth_place']
            birth_place = birth_place.replace("[", "").replace("]", "")
            # print(birth_place)
            updateArtist(birth_place, artist)
            return birth_place
        if('hometown' in page.data['infobox']):
            print("hometown found")
            hometown = page.data['infobox']['hometown']
            hometown = hometown.replace("[", "").replace("]", "")
            updateArtist(hometown, artist)
            return hometown
        if('origin' in page.data['infobox']):
            print("origin found")
            origin = page.data['infobox']['origin']
            origin = origin.replace("[", "").replace("]", "")
            updateArtist(origin, artist)
            return origin
        return False
    except:
        return False


with open('output/spotify/artists/weekly-unique.json') as data_file:
    data = json.load(data_file)
    with open('output/wiki/spotify/artists.json') as artist_file:
        oldartists = json.load(artist_file)

        for artist in data:
            try:
                artistIndex = [x["spotifyArtistName"]
                               for x in oldartists].index(artist)
                # print("FOUND TEH ARTIST INDEX:")
                # print(oldartists[artistIndex])
                if("realOrigin" not in oldartists[artistIndex]):
                    if(getWiki(artist, artist) == False):
                        if(getWiki(artist + " (band)", artist) == False):
                            if(getWiki(artist + " (musician)", artist) == False):
                                if(getWiki(artist + " (rapper)", artist) == False):
                                    if(getWiki(artist + " (singer)", artist) == False):
                                        getWiki(artist + " (artist)", artist)
                    else:
                        print("got artist on first try")
                else:
                    print("alerady have this artist's real origin")
            except:
                if(getWiki(artist, artist) == False):
                    if(getWiki(artist + " (band)", artist) == False):
                        if(getWiki(artist + " (musician)", artist) == False):
                            if(getWiki(artist + " (rapper)", artist) == False):
                                if(getWiki(artist + " (singer)", artist) == False):
                                    getWiki(artist + " (artist)", artist)
                else:
                    print("got artist on first try")
