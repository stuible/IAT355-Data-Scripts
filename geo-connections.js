var fs = require('fs');
const spotifyArtistsCharts = require("./output/geo/spotify-wiki-geo-cleaned.json")
const iso = require('iso-3166-1');

const geoConntectionsOutput = './output/geo/artist-spotify-genre-connections-nested.json';

let output = []

spotifyArtistsCharts.forEach(element => {
    // console.log(element)
    countries = {}
    element.spotifyCharts.forEach(chartItem => {
        if (chartItem.country) {
            if (countries[chartItem.country.alpha2] !== undefined) {
                countries[chartItem.country.alpha2].push({
                    date: chartItem.date,
                    position: chartItem.position
                })
            }
            else {
                countries[chartItem.country.alpha2] = [{
                    date: chartItem.date,
                    position: chartItem.position
                }]
            }
        }

        // console.log(chartItem)
    })

    Object.keys(countries).forEach(country => {
        output.push({
            artist: element.name,
            chartCountry: country,
            genre: element.genre,
            chartCountryID: iso.whereAlpha2(country).numeric,
            // spotifyCharts: countries[country]
        })
    });

    
});
console.log(output.length)
fs.writeFileSync(geoConntectionsOutput, JSON.stringify(output))