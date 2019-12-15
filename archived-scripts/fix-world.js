var fs = require('fs');

const iso = require('iso-3166-1');

const world = require('./output/geo/world-110m.json')
const worldOutput = './output/geo/world-110m-alpha2.json'

const newGeometries = world.objects.countries.geometries.map(country => {
    return {
        ...country,
        alpha2: country.id && iso.whereNumeric(country.id) ? iso.whereNumeric(country.id).alpha2 : undefined
    }
});

let newWorld = world
newWorld.objects.countries.geometries = newGeometries

fs.writeFileSync(worldOutput, JSON.stringify(newWorld))