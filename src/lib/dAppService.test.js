import {getAddressBalance} from './dAppService';

test('getAddressBalance should return a balance if using a valid address', () => {
  const address = '0x7c20badacd20f09f972013008b5e5dae82670c8d';
  const result = getAddressBalance(address);
  // console.log(result); 
  
  //TODO: should check if is float string.
  expect(typeof result).toBe('string');
});

test.skip('getAddressBalance should return a 0 balance if the given address is not valid', () => {
  const address = '0x7c20badacd20f09f972013008b5e5dae8267';
  const result = getAddressBalance(address);
  console.log(result);
});  