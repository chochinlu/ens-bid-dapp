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
  let url = "https://vincenttu.is.awesome"

  const result = urlQueryParamsObject(url);
  expect(result.empty).toBe(true);
});

test('urlQueryParamsObject should return the whole params object when the url get search query params', () => {
  let url = "https://vincenttu.is.awesome?foo=fooValue&bar=barValue"

  let result = urlQueryParamsObject(url);
  expect(result.foo).toBe('fooValue');
  expect(result.bar).toBe('barValue');
});
