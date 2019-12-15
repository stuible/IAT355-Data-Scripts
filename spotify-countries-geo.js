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

let spotifyCountries = require('./output/geo/countries.json');
const geoOutput = './output/geo/spotify-chart-countries.json';

const geoCountries = [];

main();


async function main() {

    await spotifyCountries.forEach(async country => {
        try {
            console.log("About to ask for new geo data")
            const apiData = await geocoder.geocode({ address: country.name, minConfidence: 1, limit: 1 });
            console.log("recieved geo data")

            console.log(apiData)
            if (apiData[0]) {
                const countryID = apiData[0].countryCode.toUpperCase();
                geoCountries.push({
                    originalCountryName:  country.name,
                    countryID: iso.whereAlpha2(countryID).numeric,
                    connectionKey:  apiData[0].countryCode.toUpperCase(),
                    notMatch: apiData[0].countryCode == country.id,
                    ...apiData[0],
                })
                fs.writeFileSync(geoOutput, JSON.stringify(geoCountries))
            }

            await sleep(2000);
        }
        catch {
            console.log("Error getting Geo Data")
        }
    })
    console.log("done  looping")

}

// console.log(artistGeo);

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}