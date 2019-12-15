const startData = require("./output/geo/simple-geo.json");

const writeFileSync = require('fs').writeFileSync;

const cleanedInput = require('./output/geo/cleanedSimpleGeo.json');
const flattenedOutput = './output/geo/cleanedSimpleGeoFlattened.json';

flattenedData = [];

cleanedInput.forEach(artist => {
    artist.spotifyCharts.forEach(chartEntry => {
        const { name, genre } = artist
        if(chartEntry.country && chartEntry.country.alpha2 == "US") console.log( chartEntry)
        flattenedData.push({
            name: name,
            genre: genre,
            ...chartEntry
        })
    })
})

console.log(flattenedData.length)


writeFileSync(flattenedOutput, JSON.stringify(flattenedData))