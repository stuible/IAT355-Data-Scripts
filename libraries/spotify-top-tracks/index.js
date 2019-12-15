const csv = require('csvtojson');
const requestPromise = require('request-promise');
const camelcase = require('camelcase');
const Promise = require('bluebird');
const defaultLocales = require('./default-locales');

module.exports = function spotifyCharts({
    dailyUrl = (id) => `https://spotifycharts.com/regional/${id}/daily/latest/download`, 
    weeklyUrl = (id) => `https://spotifycharts.com/regional/${id}/weekly/latest/download`, 
    locales = defaultLocales,
    request = requestPromise,
    limit = -1,
    overrideLimit = {}
}) {

    const cleanLocaleData = locales.map(locale => {
      if (locale.daily === undefined) {
        const defaultLocale = defaultLocales.find(defaultLocale => defaultLocale.id === locale.id);
        if (defaultLocale) {
          locale.daily = defaultLocale.daily;
        }
      }
      return locale
    });

    function renameHeaders(csv) {
        const splitCsv = csv.split('\n');
        splitCsv[0] = splitCsv[0].split(',').map(key => {
            return camelcase(key.replace(/"/g, ''))
        }).join(',');
        return splitCsv.map(line => `${line}\n`).join('');
    }
    
    function processResponse(res) {
        return new Promise((resolve, reject) => {
            csv().fromString(renameHeaders(res)).on('end_parsed', data => {
                resolve(data);
            }).on('done', err => {
                if(err) {
                    throw(err);
                }
            })
        });
    }
    
    return Promise.all(cleanLocaleData.map(locale => {
        let requestUrl = '';
        if (locale.daily) {
            requestUrl = dailyUrl(locale.id);
        } else {
            requestUrl = weeklyUrl(locale.id);
        }
        return request(requestUrl).then(processResponse).then(data => {
            // catching problems if HTML sneaks through
            if (!data[0]['<!doctypeHtml>']) {
                // allows specific limits per locale
                const localeLimit = overrideLimit[locale.id] || limit;
                const delimitedData = data.reduce((delimitedData, song) => {
                    if (localeLimit < 1 || delimitedData.length < localeLimit) {
                        delimitedData.push(song);
                    }
                    return delimitedData;
                }, []);
                return {
                    id: locale.id,
                    chart: delimitedData
                }
            }
            else console.error("FOUND HTML IN RESPONSE");
        })
        .catch(error => console.error("error doing request"));
    })).then(allData => {
        return allData.filter(data => data ? data : null).reduce((allChartData, localeData) => {
            allChartData[localeData.id] = localeData.chart;
            return allChartData;
        }, {});
    })
    .catch(error => {

        console.error("Was a problem grabbing your stuff")
        // console.error(error)
    });
}
