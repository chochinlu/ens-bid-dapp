const Web3 = require('web3');
const web3 = new Web3();
const ENS = require('ethereum-ens');
const contracts = require('./abi/contracts.js');
const abi = require('ethereumjs-abi');
const dAppService = require('./dAppService.js');

let ens;
const ENS_ADDRESS = process.env.ENS_ADDRESS;

const setWeb3Provider = () => {
  web3.setProvider(new web3.providers.HttpProvider(process.env.PROVIDER));
};

setWeb3Provider();

/**
 * 
 * @param {*} address 
 */
export const getAddressByEns = (address) => {
  ens = new ENS(web3, process.env.ENS_ADDRESS);
  return ens.resolver(address).addr();
}

/**
 * https://github.com/ethereum/ens/blob/master/contracts/HashRegistrarSimplified.sol#L174
 * return tuple
 * @param {*} name 
 */
export const entries = (name) => {
  return contracts.ethRegistrar.entries(contracts.namehash(name));
}

/**
 * https://github.com/ethereum/ens/blob/master/contracts/HashRegistrarSimplified.sol#L296
 * return transactionHash
 * @param {*} name 
 */
export const startAuction = (name) => {
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

/**
 * https://github.com/ethereum/ens/blob/master/contracts/HashRegistrarSimplified.sol#L117
 */
export const registryStarted = () => {
  return contracts.ethRegistrar.registryStarted();
}

/**
 * https://github.com/ethereum/ens/blob/master/contracts/HashRegistrarSimplified.sol#L139
 * @param {*} name 
 */
export const state = (name) => {
  return contracts.ethRegistrar.state(web3.sha3(name));
}
