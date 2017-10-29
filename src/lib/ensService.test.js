import {getAddressByEns, entries, startAuctionAndBid, startAuction, newBid, unsealBid, sha3, shaBid, sealedBids} from './ensService';
import {getEstimateGas} from './dAppService';
const abi = require('ethereumjs-abi');

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

/* mytesting.eth myEtherWallet
{"name":"mytesting",
"nameSHA3":"0x82f348456fc18582707fcb29379d70dff8b75a12a13cf6343f98b394c83a1182",
"owner":"0x7c20badacd20f09f972013008b5e5dae82670c8d",
"value":"10000000000000000",
"secret":"testing",
"secretSHA3":"0x5f16f4c7f149ac4f9510d9cf8cf384038ad348b3bcdc01915f95de12df9d1b02"}
*/

/*
{"name":"testabc",
"nameSHA3":"0x847dd80d44a786b6ff021980b90757e6f716dd7df9022c9e0832fa33e21cf880",
"owner":"0x7c20badacd20f09f972013008b5e5dae82670c8d",
"value":"10000000000000000",
"secret":"testing",
"secretSHA3":"0x5f16f4c7f149ac4f9510d9cf8cf384038ad348b3bcdc01915f95de12df9d1b02"}
*/

test.skip('sha3', () => {
  const name = "mytesting";
  const nameSHA3 = sha3(name);
  const secret = "testing";
  const secretSHA3 = sha3(secret);

  console.log("name", name, nameSHA3);
  console.log("secret", secret, secretSHA3);
  expect(nameSHA3).toEqual("0x82f348456fc18582707fcb29379d70dff8b75a12a13cf6343f98b394c83a1182");
  expect(secretSHA3).toEqual("0x5f16f4c7f149ac4f9510d9cf8cf384038ad348b3bcdc01915f95de12df9d1b02");
});

test('startAuctionAndBid estimateGas', () => {
  const name = 'mytestingx';
  const result = getEstimateGas(startAuctionAndBid(name, 0.01, 'testing', process.env.PRIVATE_KEY, 21));
  console.log("startAuctionAndBid, estimateGas", result);
});

test.skip('startAuction', () => {
  const name = 'mytesting';
  const result = startAuction(name, process.env.PRIVATE_KEY, 21);
  console.log("startAuction, txHash", result);
});

test.skip('newBid', async () => {
  const name = "mytesing";
  const result = await newBid(name, 0.011, 0, "testing", process.env.PRIVATE_KEY, 21);
  console.log("newBid, txHash", result);
});

test.skip('unsealBid', () => {
  const name = 'testens';
  const result = unsealBid(name, 0.01, 'testing', process.env.PRIVATE_KEY, 21);
  console.log("unsealBid, txHash", result);
});

test('sealedBids', () => {
  const name = "testabc";
  const secret = "testing";
  const result = sealedBids(sha3(name), 10000000000000000, sha3(secret), process.env.PRIVATE_KEY, 21);
  console.log("sealedBids result", result);
});
