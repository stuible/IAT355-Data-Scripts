import getValue from './getValue';
import camelCase from 'camelcase';

const keyValueGlobalPattern = /\|\s*([-'\u0400-\u04FF\w\s]+)\s*=\s*([^|]+)?/g;
const keyValuePattern = /\|\s*([-'\u0400-\u04FF\w\s]+)\s*=\s*([^|]+)?/;

export default function findPropertyList(source) {
  const keyValuePairs = source.match(keyValueGlobalPattern);
  if (!keyValuePairs) {
    return [];
  }
  return keyValuePairs
    .map(match => {
      // console.log(keyValuePattern.exec(match))
      const result = keyValuePattern.exec(match);
      if (!result) {
        return null;
      }
      const [, rawKey, rawValue] = result;
      const key = camelCase(rawKey.trim());

      // if(key == 'birthPlace'){
      //   console.log(rawValue)
      //   console.log(getValue(rawValue, key))
      // }
      
      return {
        key,
        value: getValue(rawValue, key),
      };
    })
    .filter(item => item);
}
