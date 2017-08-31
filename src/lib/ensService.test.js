import {getAddressByEns, entries} from './ensService';

test('getAddressByEns should not return "ENS not found" if the given .eth exists.', async () => {
  const name = 'testing.eth';
  const result = await getAddressByEns(name);
  expect(result).not.toEqual('ENS not found');
});

test('getAddressByEns should  return a valid address if the given .eth exists.', async () => {
  const name = 'testing.eth';
  const result = await getAddressByEns(name);
  // console.log(result)
  expect(typeof result).toBe('string');
  expect(result).toMatch(/^0x/);
});

test('entries', () => {
  const name = 'foobar';
  const result = entries(name);
  console.log(result);
});
