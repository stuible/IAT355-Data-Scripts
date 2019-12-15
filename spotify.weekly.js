const spotifyTopTracks = require('./libraries/spotify-top-tracks')
const fs = require('fs')

init()

async function init() {
    var start = new Date("12/23/2016");
    var end = new Date("11/22/2019");


    var loop = new Date(start);
    while (loop <= end) {

        endRange = new Date(loop);
        endRange.setDate(endRange.getDate() + 7)

        var dd = ("0" + loop.getDate()).slice(-2);
        var mm = ("0" + (loop.getMonth() + 1)).slice(-2);
        var yyyy = loop.getFullYear();

        var end_dd = ("0" + endRange.getDate()).slice(-2);
        var end_mm = ("0" + (endRange.getMonth() + 1)).slice(-2);
        var end_yyyy = endRange.getFullYear();

        var formattedDate = `${yyyy}-${mm}-${dd}`;
        var formattedDateRange = `${yyyy}-${mm}-${dd}--${end_yyyy}-${end_mm}-${end_dd}`;

        console.log(formattedDate);

        await getWeeklyTopTracks(formattedDateRange);



        var newDate = loop.setDate(loop.getDate() + 7);
        loop = new Date(newDate);
    }
}

async function getWeeklyTopTracks(date) {


    spotifyTopTracks({
        // extended explanation above
        locales:[{
            id: "global",
            name: "Global",
            daily: false
        },
        {
            id: "us",
            name: "United States",
            daily: false
        },
        {
            id: "gb",
            name: "United Kingdom",
            daily: false
        },
        {
            id: "ad",
            name: "Andorra",
            daily: false
        },
        {
            id: "ar",
            name: "Argentina",
            daily: false
        },
        {
            id: "at",
            name: "Austria",
            daily: false
        },
        {
            id: "au",
            name: "Australia",
            daily: false
        },
        {
            id: "be",
            name: "Belgium",
            daily: false
        },
        {
            id: "bg",
            name: "Bulgaria",
            daily: false
        },
        {
            id: "bo",
            name: "Bolivia",
            daily: false
        },
        {
            id: "br",
            name: "Brazil",
            daily: false
        },
        {
            id: "ca",
            name: "Canada",
            daily: false
        },
        {
            id: "ch",
            name: "Switzerland",
            daily: false
        },
        {
            id: "cl",
            name: "Chile",
            daily: false
        },
        {
            id: "co",
            name: "Colombia",
            daily: false
        },
        {
            id: "cr",
            name: "Costa Rica",
            daily: false
        },
        {
            id: "cy",
            name: "Cyprus",
            daily: false
        },
        {
            id: "cz",
            name: "Czech Republic",
            daily: false
        },
        {
            id: "de",
            name: "Germany",
            daily: false
        },
        {
            id: "dk",
            name: "Denmark",
            daily: false
        },
        {
            id: "do",
            name: "Dominican Republic",
            daily: false
        },
        {
            id: "ec",
            name: "Ecuador",
            daily: false
        },
        {
            id: "ee",
            name: "Estonia",
            daily: false
        },
        {
            id: "es",
            name: "Spain",
            daily: false
        },
        {
            id: "fi",
            name: "Finland",
            daily: false
        },
        {
            id: "fr",
            name: "France",
            daily: false
        },
        {
            id: "gr",
            name: "Greece",
            daily: false
        },
        {
            id: "gt",
            name: "Guatemala",
            daily: false
        },
        {
            id: "hk",
            name: "Hong Kong",
            daily: false
        },
        {
            id: "hn",
            name: "Honduras",
            daily: false
        },
        {
            id: "hu",
            name: "Hungary",
            daily: false
        },
        {
            id: "id",
            name: "Indonesia",
            daily: false
        },
        {
            id: "ie",
            name: "Ireland",
            daily: false
        },
        {
            id: "is",
            name: "Iceland",
            daily: false
        },
        {
            id: "it",
            name: "Italy",
            daily: false
        },
        {
            id: "jp",
            name: "Japan",
            daily: false
        },
        {
            id: "lt",
            name: "Lithuania",
            daily: false
        },
        {
            id: "lu",
            name: "Luxembourg",
            daily: false
        },
        {
            id: "lv",
            name: "Latvia",
            daily: false
        },
        {
            id: "mc",
            name: "Monaco",
            daily: false
        },
        {
            id: "mt",
            name: "Malta",
            daily: false
        },
        {
            id: "mx",
            name: "Mexico",
            daily: false
        },
        {
            id: "my",
            name: "Malaysia",
            daily: false
        },
        {
            id: "ni",
            name: "Nicaragua",
            daily: false
        },
        {
            id: "nl",
            name: "Netherlands",
            daily: false
        },
        {
            id: "no",
            name: "Norway",
            daily: false
        },
        {
            id: "nz",
            name: "New Zealand",
            daily: false
        },
        {
            id: "pa",
            name: "Panama",
            daily: false
        },
        {
            id: "pe",
            name: "Peru",
            daily: false
        },
        {
            id: "ph",
            name: "Philippines",
            daily: false
        },
        {
            id: "pl",
            name: "Poland",
            daily: false
        },
        {
            id: "pt",
            name: "Portugal",
            daily: false
        },
        {
            id: "py",
            name: "Paraguay",
            daily: false
        },
        {
            id: "se",
            name: "Sweden",
            daily: false
        },
        {
            id: "sg",
            name: "Singapore",
            daily: false
        },
        {
            id: "sk",
            name: "Slovakia",
            daily: false
        },
        {
            id: "sv",
            name: "El Salvador",
            daily: false
        },
        {
            id: "th",
            name: "Thailand",
            daily: false,
        },
        {
            id: "tr",
            name: "Turkey",
            daily: false
        },
        {
            id: "tw",
            name: "Taiwan",
            daily: false
        },
        {
            id: "uy",
            name: "Uruguay",
            daily: false
        }],
        // only return the top 5 tracks
        limit: 100,
        // Override limit on a per locale basis
        overrideLimit: {
            global: -1
        },
        // A function that returns a URL to download the daily top tracks from a certain country
        // dailyUrl: (id) => {
        //     console.log(`https://spotifycharts.com/regional/${id}/daily/${date}/download`)
        //     return `https://spotifycharts.com/regional/${id}/daily/${date}/download`
        // },
        // A function that returns a URL to download the weekly top tracks from a certain country
        weeklyUrl: (id) => {
            console.log(`https://spotifycharts.com/regional/${id}/weekly/${date}/download`)
            return `https://spotifycharts.com/regional/${id}/weekly/${date}/download`
        },
        // A request library; Convenient to swap out for mocked requests in testing
        // request: requestPromise
    }).then(chartData => {
        // console.log(chartData['us'][99])
        fs.writeFileSync(`./output/spotify/weekly/${date}.json`, JSON.stringify(chartData))
    });

    await sleep(5000)

}
function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}