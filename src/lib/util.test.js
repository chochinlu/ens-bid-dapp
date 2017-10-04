import {isValidJsonString} from './util';
import {urlQueryParamsObject} from './util';

test('isValidJsonString should return true if str is a valid json string', () => {
  const str = '{"hello": 123}';
  const result = isValidJsonString(str);
  expect(result).toBe(true);
});

test('isValidJsonString should return false if str is not a valid json string', () => {
  const str = '{hello: 123}';
  const result = isValidJsonString(str);
  expect(result).toBe(false);
});

test('urlQueryParamsObject should return false when the url has no search query', () => {
  var customNoSearchQueryWindow = {
    location: {
      search: ""
    }
  };
  customNoSearchQueryWindow.window = customNoSearchQueryWindow;

  (function(window) {
    const result = urlQueryParamsObject();
    expect(result).toBe(false);
  })(customNoSearchQueryWindow);
});

// test('urlQueryParamsObject should return the whole params object when the url get search query params', () => {
//   var customHasSearchQueryWindow = {
//     location: {
//       search: "?foo=fooValue&bar=barValue"
//     }
//   };
//   customHasSearchQueryWindow.window = customHasSearchQueryWindow;

//   (function(window) {
//     let result = urlQueryParamsObject();
//     expect(result.foo).toBe('fooValue');
//     expect(result.bar).toBe('barValue');
//   })(customHasSearchQueryWindow);
// });
