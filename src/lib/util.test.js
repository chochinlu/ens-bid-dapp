import {isValidJsonString} from './util';

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