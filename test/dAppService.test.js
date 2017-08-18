import {sendRawTransaction} from './dAppService';
import {searchAddress, entries, startAuction, registryStarted} from './ensService';

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
  //await sendRawTransaction(testPayload);
  searchAddress("testing.eth");
  let entriesResult = await entries("testingaadsxdd");
  console.log("entries", entriesResult);

  await startAuction("testingaadsxdd");
  let registryStartedResult = await registryStarted();
  console.log("registryStarted", registryStartedResult);
};
runTestSuite();
