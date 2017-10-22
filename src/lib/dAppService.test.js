import {getAddressBalance, getAddressByPrivateKey, ensJsonExport} from './dAppService';

test('getAddressBalance should return a balance if using a valid address', () => {
  const address = '0x7c20badacd20f09f972013008b5e5dae82670c8d';
  const result = getAddressBalance(address);
  // console.log(result); 
  
  //TODO: should check if is float string.
  expect(typeof result).toBe('string');
});

test('getAddressByPrivateKey should return a valid address by given private key', () => {
  const privateKey = process.env.PRIVATE_KEY;
  const address = getAddressByPrivateKey(privateKey);
  console.log(address);
}); 

test.skip('getAddressBalance should return a 0 balance if the given address is not valid', () => {
  const address = '0x7c20badacd20f09f972013008b5e5dae8267';
  const result = getAddressBalance(address);
  console.log(result);
});  

test('ensJsonExport', () => {
  const name = "mytesting";
  const secret = "testing";
  const ether = 0.01;
  const address = getAddressByPrivateKey(process.env.PRIVATE_KEY);
  console.log(ensJsonExport(name, ether, secret, address));
});
