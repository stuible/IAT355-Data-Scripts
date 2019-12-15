var fs = require('fs');

const json = require("./output/geo/spotify-wiki-geo")
const cleanOutput = "./output/geo/spotify-wiki-geo-cleaned.json"
const artistOnlyCleanOutput = "./output/geo/artist-only-wiki-geo-cleaned.json"

const cleanData = json.map(element => {

    let rankTotal = 0;
    element.spotifyCharts.filter(chart => chart.country && chart.country.alpha2 == element.geoData.countryCode.toUpperCase()).forEach(item => {
        rankTotal += Number.parseInt(item.position)
        // console.log(item)
    })

    const newFormat = {
        name: element.spotifyArtistName,
        origin: element.realOrigin,
        longitude: element.geoData.longitude,
        latitude: element.geoData.latitude,
        country: element.geoData.country,
        city: element.geoData.city,
        state: element.geoData.state,
        countryCode: element.geoData.countryCode,
        genre: Array.isArray(element.genre) ? element.genre[0] : element.genre,
        label: Array.isArray(element.label) ? element.label : [element.label],
        rankAverage:  element.spotifyCharts.filter(chart => chart.country && chart.country.alpha2 == element.geoData.countryCode.toUpperCase()).length
    }
    console.log(newFormat)
    return newFormat
});


// console.log(cleanData.length)
// const smallerData = cleanData.filter(element => {
//     return element.spotifyCharts.length > 10 
// })
// console.log(smallerData.length)


fs.writeFileSync(cleanOutput, JSON.stringify(cleanData))
fs.writeFileSync(artistOnlyCleanOutput, JSON.stringify(cleanData))
