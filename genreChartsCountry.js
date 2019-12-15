const data = require("./output/geo/spotify-wiki-geo-cleaned.json")
var fs = require('fs')
const countries = require("./output/geo/countries.json")

const output = "./output/geo/small-genre-spotify-stats.json"

let flatData = []

data.filter(artist => artist.genre != "hlist").forEach(artist => {

    countries.forEach(country => {
        // console.log(artist.spotifyCharts[7].country) //id
        countryChartItems = artist.spotifyCharts.filter(chart => chart.country && chart.country.alpha2 == country.id.toUpperCase())

        if(countryChartItems){

            const uniqueDates = [...new Set(countryChartItems.map(item => item.date))];

            uniqueDates.filter(date => new Date(date.split("-")[0], date.split("-")[1], date.split("-")[2]) > new Date(2018, 11, 1)).forEach(date => {
                // console.log(date)
                chartItems = countryChartItems.filter(chart => chart.date == date)

                positionTotal = 0;
                chartItems.forEach(chart => {
                    positionTotal += Number.parseInt(chart.position)
                })
                // console.log(chartItems.length)

                if(chartItems.length > 1)console.log({
                    artist: artist.name,
                    genre: artist.genre,
                    artistOrigin: artist.origin,
                    chartCountry: country.name,
                    chartCountryID: country.id.toUpperCase(),
                    date: date,
                    averagePosition: positionTotal / chartItems.length
                })

                flatData.push({
                    artist: artist.name,
                    genre: artist.genre,
                    artistOrigin: artist.origin,
                    chartCountry: country.name,
                    chartCountryID: country.id.toUpperCase(),
                    date: date,
                    averagePosition: positionTotal / chartItems.length
                })
            })

            // // positionTotal = 0;
            // countryChartItems.forEach(chartItem => {
            //     positionTotal += Number.parseInt(chartItem.position)
            // })
            // // console.log(positionTotal)
            // // flatData.push({
            // //     artist: artist,

            // // })
        }
        
    })
    // artist.spotifyCharts.forEach(chart => {
    //     positionTotal += chart.position
    // })
});

console.log(flatData.length)
fs.writeFileSync(output, JSON.stringify(flatData))