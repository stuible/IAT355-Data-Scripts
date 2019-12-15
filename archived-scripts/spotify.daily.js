const spotifyTopTracks = require('../libraries/spotify-top-tracks')
const fs = require('fs')

init()

async function init() {
    var start = new Date("01/01/2017");
    var end = new Date("11/22/2019");


    var loop = new Date(start);
    while (loop <= end) {

        var dd = ("0" + loop.getDate()).slice(-2);
        var mm = ("0" + (loop.getMonth() + 1)).slice(-2);
        var yyyy = loop.getFullYear();

        var formattedDate = `${yyyy}-${mm}-${dd}`;

        console.log(formattedDate);
        

        await getDailyTopTracks(formattedDate);



        var newDate = loop.setDate(loop.getDate() + 1);
        loop = new Date(newDate);
    }
}

async function getDailyTopTracks(date) {


    spotifyTopTracks({
        // extended explanation above
        // locales: onlyGlobalAndNicaragua,
        // only return the top 5 tracks
        limit: 101,
        // Override limit on a per locale basis
        overrideLimit: {
            global: -1
        },
        // A function that returns a URL to download the daily top tracks from a certain country
        dailyUrl: (id) => {
            console.log(`https://spotifycharts.com/regional/${id}/daily/${date}/download`)
            return `https://spotifycharts.com/regional/${id}/daily/${date}/download`
        },
        // A function that returns a URL to download the weekly top tracks from a certain country
        // weeklyUrl: (id) => `https://spotifycharts.com/regional/${id}/weekly/latest/download`,
        // A request library; Convenient to swap out for mocked requests in testing
        // request: requestPromise
    }).then(chartData => {
        // console.log(chartData)
        fs.writeFileSync(`./output/spotify/daily/${date}-spotify-top-tracks.json`, JSON.stringify(chartData))
    });

    await sleep(5000)

}
function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}