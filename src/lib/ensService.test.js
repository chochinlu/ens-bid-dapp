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
  const name = 'mytesting';
  const result = entries(name);
  console.log(name, result);
  expect(result).toEqual(expect.objectContaining({
    state: expect.any(String),
    deed: expect.any(String),
    registrationDate: expect.any(Object),
    value: expect.any(Number),
    highestBid: expect.any(Number)
  }));

  // { state: 'Open',
  // deed: '0x0000000000000000000000000000000000000000',
  // registrationDate: 1970-01-01T00:00:00.000Z,
  // value: 0,
  // highestBid: 0 }
});
