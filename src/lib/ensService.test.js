import {getAddressByEns, entries} from './ensService';

test.skip('getAddressByEns', () => {
  const name = 'foobar.eth';
  const result = getAddressByEns(name);
  console.log(result);
});

test.only('entries', () => {
  const name = 'foobar';
  const result = entries(name);
  console.log(result);
});
