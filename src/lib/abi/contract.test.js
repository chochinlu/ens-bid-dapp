import {getHexHash, getNameHexHash} from './contracts';

test('getHash should return a hashed hex string by using web3.sha3', () => {
  const startHash = 'eth';
  const result = getHexHash(startHash);

  expect(result.length).toBe(66);
  expect(typeof result).toBe('string');
  expect(result).toMatch(/^0x/);
});

test('getNameHexHash should return a default hex string which the name is a empty string', () => {
  const name = '';
  const result = getNameHexHash(name);
  const expected = '0x0000000000000000000000000000000000000000000000000000000000000000';
  expect(result).toBe(expected);
});

test('getNameHexHash should return a default hex string', () => {
  const name = 'eth';
  const result = getNameHexHash(name);
  expect(result.length).toBe(66);
  expect(typeof result).toBe('string');
  expect(result).toMatch(/^0x/);
});
