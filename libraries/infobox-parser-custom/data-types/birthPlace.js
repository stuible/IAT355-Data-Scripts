const birthPlaceGlobalPattern = /\{\{birthplace([^\}\}]+)\}\}/ig;
const birthPlacePattern = /birthplace\|([^|]+)\|(.*)\}\}/;

// const marriageGlobalPattern = /\{\{Marriage\|([^\}\}]+)\}\}/g;
// const marriagePattern = /Marriage\|([^|]+)\|(.*)\}\}/;

// const millisInYear = 1000 * 60 * 60 * 24 * 365;

export default {
  globalPattern: birthPlaceGlobalPattern,
  parsePattern: birthPlacePattern,
  parse: results => {
    console.log("called birthplace parser")
    // console.log(results)
    // const [, year, month, day] = results;
    // const date = new Date(year, month-1, day);
    // const age = Math.floor((Date.now() - +date) / millisInYear);
    return results
  },
  variable: 'BIRTH_PLACE',
  name: 'birthPlace',
};
