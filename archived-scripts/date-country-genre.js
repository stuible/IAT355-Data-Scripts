const startData = require("./output/geo/simple-geo.json");

const writeFileSync = require('fs').writeFileSync;

const cleanedFlatInput = require('./output/geo/cleanedSimpleGeoFlattened.json');
const averagePosOutput = "./output/geo/dateCountryGenrePositionAverage.json"

let averageData = [];


let uniqueDates = removeDuplicates(cleanedFlatInput.map(ranking => ranking.date))

uniqueDates.forEach(day => {
    let uniqueGenres = removeDuplicates(cleanedFlatInput.filter(ranking => ranking.date == day).map(ranking => ranking.genre))

    // console.log(uniqueGenres.length)
    uniqueGenres.forEach(genre => {
        let uniqueCountries = removeDuplicates(cleanedFlatInput
            .filter(ranking => ranking.date == day && ranking.genre == genre)
            .map(ranking => ranking.country ? ranking.country.country : undefined))

        uniqueCountries.forEach(country => {
            // console.log(country)
            let positionTotal = 0;
            const selectedItems = cleanedFlatInput.filter(ranking => ranking.date == day && ranking.genre == genre && ranking.country && ranking.country.country == country)

            selectedItems.forEach(item => {
                positionTotal += parseInt(item.position)
            })
            const positionAverage = positionTotal / selectedItems.length
            // console.log(positionAverage)

            averageData.push({
                country: country,
                genre: genre,
                date: day,
                averagePosition: positionAverage
            })
        })
        
        // 
        // let genrePositionTotal = 0;
        // console.log(selectedItems)
        // selectedItems.forEach(item => {
        //   console.log(item.positon)
        //   genrePositionTotal += parseInt(item.positon)
        // })
        // console.log(genrePositionTotal)
    })
})


writeFileSync(averagePosOutput, JSON.stringify(averageData))


function removeDuplicates(array) {
    let unique = {};
    array.forEach(function (i) {
        if (!unique[i]) {
            unique[i] = true;
        }
    });
    return Object.keys(unique);
}