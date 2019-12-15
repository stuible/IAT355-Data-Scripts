var fs = require('fs');
const { promisify } = require('util')
const readDirAsync = promisify(fs.readdir)
const wiki = require('wikijs').default;
const iso = require('iso-3166-1');

const errorsOutput = './output/geo/fails.json';

let errorOrigins = require(errorsOutput)

var NodeGeocoder = require('node-geocoder');
var options = {
    provider: 'opencage',

    // Optional depending on the providers
    httpAdapter: 'https', // Default
    apiKey: '982096169cbe4de3b4dc4e25a2ecea3e', // for Mapquest, OpenCage, Google Premier
    formatter: null         // 'gpx', 'string', ...
};
var geocoder = NodeGeocoder(options);


const geoInput = require('./output/geo/spotify-wiki-geo.json');
const geoSmallOutput = './output/geo/spotify-wiki-geo-small.json';

const flattenedCharts = [];

geoInput.forEach(artist => {
    // console.log(artist)
    artist.spotifyCharts.forEach(chartItem => {
        flattenedCharts.push({
            date: chartItem.date,
            chartCountry: chartItem.country ? chartItem.country.country : undefined,
            chartCountryAlpha2: chartItem.country ? chartItem.country.alpha2 : undefined,
            chartCountryNumeric: chartItem.country ? chartItem.country.numeric : undefined,
            position: chartItem.position,
            artist: chartItem.artist,
            artistOrigin: artist.realOrigin,
            // artistGeoData: artist.geoData
        })
    })
});
console.log(flattenedCharts[4000])

    fs.writeFileSync(geoSmallOutput, JSON.stringify(flattenedCharts))
