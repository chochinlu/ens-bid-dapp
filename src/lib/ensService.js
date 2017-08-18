const Web3 = require('web3');
const web3 = new Web3();
const ENS = require('ethereum-ens');
const contracts = require('./abi/contracts.js');
//const ensTestnet = require('../abi/ens-testnet.js');
let ens;
let ethRegistrarContract;

const ENS_ADDRESS = "0x112234455c3a32fd11230c42e7bccd4a84e02010";

const setWeb3Provider = () => {
  const API_KEY = process.env.INFURA_API_KEY; //TODO: should check if is empty string
  console.log(``)
  const provider = `https://ropsten.infura.io/${API_KEY}`;
  web3.setProvider(new web3.providers.HttpProvider(provider));
};

setWeb3Provider();

// 要降版本才可以 work
export const searchAddress = (address) => {
  ens = new ENS(web3, ENS_ADDRESS);
  return ens.resolver(address).addr();
}

export const entries = (name) => {
  // return TUPLE, https://github.com/ethereum/ens/blob/master/contracts/HashRegistrarSimplified.sol#L174
  return contracts.ethRegistrar.entries(web3.sha3(name));
}

export const startAuction = (name) => {
  // 這邊看能不能加入 estimateGas
  // nothing return, https://github.com/ethereum/ens/blob/master/contracts/HashRegistrarSimplified.sol#L296
  contracts.ethRegistrar.startAuction(web3.sha3(name), {from: "0x7c20badacd20f09f972013008b5e5dae82670c8d", gas: 100000});
}

export const registryStarted = () => {
  return contracts.ethRegistrar.registryStarted();
}
