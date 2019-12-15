var fs = require('fs');
const { promisify } = require('util')
const readDirAsync = promisify(fs.readdir)
const wiki = require('wikijs').default;

const spotifyWeeklyPath = './output/spotify/weekly/';
const wikiSpotifyOutput = './output/wiki/spotify/artists.json';
const errorsOutput = './output/wiki/spotify/fails.json';
const uniqueArtistsOutput = './output/spotify/artists/weekly-unique.json';


let uniqueArtists = [];

const getUniqueArtists = async () => {
    const files = await readDirAsync(spotifyWeeklyPath);
    files.filter(file => file.endsWith('.json')).forEach(async file => {
        console.log(spotifyWeeklyPath + file)
        let jsonData = await require(spotifyWeeklyPath + file);
        // console.log(jsonData);


        Object.values(jsonData).forEach(chart => {
            // console.log(chart[0])
            chart.forEach(item => {
                // console.log(item);
                if (!uniqueArtists.includes(item.field3) && item.field3 !== "Artist") uniqueArtists.push(item.field3);
            })
        })

    });

}

getUniqueArtists().then(() => {
    console.log(`finished identifying ${uniqueArtists.length} unique artists`);
    // console.log(uniqueArtists)

    fs.writeFileSync(uniqueArtistsOutput, JSON.stringify(uniqueArtists))

    getWikiData();
})

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

const getWikiData = async () => {
    let index = 0;

    // const shorter = billboardData.songs.slice(0,  1);
    // console.log(shorter);

    await asyncForEach(uniqueArtists, async (artist) => {
        index++;
        console.log(`Getting Wikipedia Data On: ${artist} (${index}/${uniqueArtists.length})`);

        const data = fs.readFileSync(wikiSpotifyOutput)
        let json = JSON.parse(data)
        const failData = fs.readFileSync(errorsOutput)
        let failJson = JSON.parse(failData)

        if (!json.find(item => item.spotifyArtistName == artist) && !failJson.find(item => item == artist)) {
            await sleep(500);
            if (! await searchWikipedia(artist, artist, json)) {
                await sleep(500);
                if (! await searchWikipedia(`${artist} (musician)`, artist, json)) {
                    await sleep(500);
                    if (! await searchWikipedia(`${artist} (band)`, artist, json)) {
                        await sleep(500);
                        if (! await searchWikipedia(`${artist} (rapper)`, artist, json)) {
                            await sleep(500);
                            if (! await searchWikipedia(`${artist} (singer)`, artist, json)) {
                                failJson.push(artist)
                                fs.writeFileSync(errorsOutput, JSON.stringify(failJson))
                            }
                        }
                    }
                }
            }
        }
        else console.log("Already have this artist saved, skip");

    });



}


async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

async function searchWikipedia(search, artist, json) {
    let success = false;
    console.log("start wiki request")
    await wiki()
        .find(search)
        .catch(error => {
            console.error(error)
            return error;
        })
        .then(page => page.info())
        .catch(error => {
            console.error(error)

            return error;
        })
        .then(info => {
            // let mergedData = info;
            // mergedData['billboard_rankings'] = artist.rankings;
            // wikiData.push(mergedData)
            if (Object.entries(info).length !== 0) {
                console.log("Found Wikipedia Data")



                info.spotifyArtistName = artist;

                json.push(info)
                // console.log(json)

                fs.writeFileSync(wikiSpotifyOutput, JSON.stringify(json))
                success = true;
            }
            else {
                console.error("Wikipedia Data Not found for artist")
            }

        })
    console.log("end wiki request")
    return success;
}