const startData = require("./output/geo/simple-geo.json");

const writeFileSync = require('fs').writeFileSync;

const cleanedOutput = './output/geo/cleanedSimpleGeo.json';

const cleanedData = startData.filter(artist => {
    return artist.genre !== "hlist" && 
    (artist.birthPlace || artist.origin || artist.hometown) &&
    artist.label !== "hlist"
}).map(artist => {
    return {
        name: artist.spotifyArtistName,
        genre: Array.isArray(artist.genre) ? artist.genre[0] : artist.genre,
        label: artist.label,
        origin: artist.birthPlace ? artist.birthPlace : (artist.origin ? artist.origin : artist.hometown),
        spotifyCharts: artist.spotifyCharts
    }
})

console.log(cleanedData.find(artist => artist.name == "Meek Mill").spotifyCharts.filter(item => item.country && item.country.alpha2 == "US"))

console.log(startData.length)
console.log(cleanedData.length)
// writeFileSync(cleanedOutput, JSON.stringify(cleanedData))