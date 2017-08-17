import {sendRawTransaction} from './dAppService';
import {searchAddress, initRegistrar} from './ensService';

const PRIVATE_KEY = process.env.PRIVATE_KEY;
console.log(`PRIVATE_KEY: ${PRIVATE_KEY}`);

const testPayload = {
  from: '0x7c20badacd20f09f972013008b5e5dae82670c8d',
  to: '0xd6026ddc3a2be02a3577de714a98e24dc4a89dbf',
  value: '0x100',
  data: '',
  privateKey: PRIVATE_KEY
};

//Sequential run tests
const runTestSuite = async () => {
  await sendRawTransaction(testPayload);

  await searchAddress("testing.eth");
  await searchAddress("dasdfasdfa.eth");
  //let registrar = await initRegistrar();
  //console.log(registrar.contract);
};
runTestSuite();