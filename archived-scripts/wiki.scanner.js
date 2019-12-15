const wikiJSON = require('./output/wiki/spotify/artists.json');

let failCount = 0;
wikiJSON.forEach((artist, index) => {
    if (artist.showName ||
        artist.runtime ||
        artist.teamlogo ||
        artist.league ||
        artist.founded ||
        artist.area) return;


    if (!artist.birthPlace && !artist.origin) {
        console.log(artist.spotifyArtistName)
        failCount++;
    }
});

console.log("---------------------------")
console.log("Artists with missing Origins: " + failCount)
console.log("---------------------------")