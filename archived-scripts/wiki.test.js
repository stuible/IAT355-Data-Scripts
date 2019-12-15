const wiki = require('wikijs').default;
const parseInfo = require("../libraries/infobox-parser-custom/build")

wiki()
    .find("Camila Cabello")
    .catch(error => {
        console.error(error)
        return error;
    })
    .then(async page => {
        const coordinates = await page.coordinates();
        const info = await page.rawInfo();

        

        // console.log(info)

        console.log(await parseInfo(info))
        // return info
    })
    // .then(info => info.general.birthPlace)
    // .then(birth => console.log(birth));

