const Web3 = require('web3');
const web3 = new Web3();
const ENS = require('ethereum-ens');
const contracts = require('./abi/contracts.js');
const abi = require('ethereumjs-abi');
const dAppService = require('./dAppService.js');

let ens;
const ENS_ADDRESS = "0x112234455c3a32fd11230c42e7bccd4a84e02010";

const setWeb3Provider = () => {
  const API_KEY = process.env.INFURA_API_KEY; //TODO: should check if is empty string
  console.log(``)
  const provider = `https://ropsten.infura.io/${API_KEY}`;
  web3.setProvider(new web3.providers.HttpProvider(provider));
};

setWeb3Provider();

export const searchAddress = (address) => {
  ens = new ENS(web3, ENS_ADDRESS);
  return ens.resolver(address).addr();
}

export const entries = (name) => {
  // return TUPLE, https://github.com/ethereum/ens/blob/master/contracts/HashRegistrarSimplified.sol#L174
  return contracts.ethRegistrar.entries(web3.sha3(name));
}

export const startAuction = (name) => {
  // nothing return, https://github.com/ethereum/ens/blob/master/contracts/HashRegistrarSimplified.sol#L296
  let byteData = "0x" + 
                abi.methodID("startAuction", [ "bytes32" ]).toString("hex") + 
                abi.rawEncode([ "bytes32" ], [ name ]).toString("hex");
                
  let ethRegistrarAddress = contracts.ens.owner(contracts.namehash('eth'));
  console.log("ETH registrar:", ethRegistrarAddress);
  const payload = {
    from: '0x7c20badacd20f09f972013008b5e5dae82670c8d',
    to: ethRegistrarAddress,
    value: '0x0',
    data: byteData,
    privateKey: process.env.PRIVATE_KEY
  };
  dAppService.sendRawTransaction(payload);
}

export const registryStarted = () => {
  return contracts.ethRegistrar.registryStarted();
}
