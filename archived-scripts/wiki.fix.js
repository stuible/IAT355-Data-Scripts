// Removed the duplicates I accidentailly added to artists.json (Why is async await so hard)

import { readFileSync, writeFileSync } from 'fs';

const wikiSpotifyOutput = './output/wiki/spotify/artists.json';


const data = readFileSync(wikiSpotifyOutput)
let json = JSON.parse(data)



const uniqueData = Array.from(new Set(json.map(a => a.spotifyArtistName)))
 .map(spotifyArtistName => {
   return json.find(a => a.spotifyArtistName === spotifyArtistName)
 })


writeFileSync(wikiSpotifyOutput, JSON.stringify(uniqueData))