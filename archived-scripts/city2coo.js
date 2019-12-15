var NodeGeocoder = require('node-geocoder');
var options = {
    provider: 'opencage',

    // Optional depending on the providers
    httpAdapter: 'https', // Default
    apiKey: '982096169cbe4de3b4dc4e25a2ecea3e', // for Mapquest, OpenCage, Google Premier
    formatter: null         // 'gpx', 'string', ...
};
var geocoder = NodeGeocoder(options);

const example2 = { "name": "Luan Santana", "image": "Luan Santana Citibank Hall (41171200671).jpg", "imageSize": "220px", "caption": "Santana in 2017", "birthName": "Luan Rafael Domingos Santana", "birthDate": { "date": "1991-03-13T08:00:00.000Z", "age": 28 }, "birthPlace": "Campo Grande", "residence": ["Barueri", "São Paulo (state)", "Brazil"], "occupation": "hlist", "yearsActive": "2007–present", "module": "Infobox musical artist", "embed": true, "background": "solo_singer", "instrument": "Vocals", "genre": "flat list", "label": "Som Livre", "website": "[http://www.luansantana.com.br/ www.luansantana.com.br]", "spotifyArtistName": "Luan Santana" }

const example = { "name": "Justin Quiles", "birthName": "Justin Rafael Quiles Rivera", "birthDate": { "date": "1990-03-29T08:00:00.000Z", "age": 29 }, "birthPlace": "Bridgeport, Connecticut", "occupation": "Singer", "yearsActive": "2002–present", "website": "http://www.justinquiles.com", "module": "Infobox musical artist", "embed": true, "background": "solo_singer", "genre": "hlist", "instrument": "Vocals", "label": "Rich Music", "associatedActs": "hlist", "spotifyArtistName": "Justin Quiles" }

geocoder.geocode({ address: 'Campo Grande',minConfidence: 0.5, limit: 5 }, function (err, res) {
    console.log(res);
});