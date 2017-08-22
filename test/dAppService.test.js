import {sendRawTransaction, getAddressByPrivateKey, getTransactionReceipt, getTransaction} from './dAppService';
import {getAddressByEns, entries, startAuction, registryStarted, state} from './ensService';

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
  let txResult = getTransaction("0x607f16eda0ba7a4f09283d26c1cbbd9050c3a2a613132e15150c50dfe1fc4613");
  console.log("tx", txResult);

  let receiptResult = getTransactionReceipt("0x607f16eda0ba7a4f09283d26c1cbbd9050c3a2a613132e15150c50dfe1fc4613");
  console.log("receipt", receiptResult);

  console.log("address by private key", getAddressByPrivateKey(PRIVATE_KEY));
  // WARNING: DONT USE THIS TEST CASE ON MAINNET
  //await sendRawTransaction(testPayload);
  console.log("address by ens", getAddressByEns("phyrextsai.eth"));
  
  let entriesResult = await entries("phyrextsai");
  console.log("entries", entriesResult);

  // WARNING: DONT USE THIS TEST CASE ON MAINNET
  //await startAuction("testingaadsxdd");

  let registryStartedResult = await registryStarted();
  console.log("registryStarted", registryStartedResult);

  console.log("state", state("phyrextsai"));

};
runTestSuite();
