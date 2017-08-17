const Registrar = require('eth-registrar-ens');
const Web3 = require('web3');
const web3 = new Web3();
const ENS = require('ethereum-ens');
//const ensTestnet = require('../abi/ens-testnet.js');
let ens;
let registrar;

const ENS_ADDRESS = "0x112234455c3a32fd11230c42e7bccd4a84e02010";

const setWeb3Provider = () => {
  const API_KEY = process.env.INFURA_API_KEY; //TODO: should check if is empty string
  console.log(``)
  const provider = `https://ropsten.infura.io/${API_KEY}`;
  web3.setProvider(new web3.providers.HttpProvider(provider));
};

setWeb3Provider();

export const searchAddress = (address) => {
  ens = new ENS(web3);
  ens.resolver(address).addr().then(function(addr) { 
    console.log(addr);
  }).catch(function(err) {
    console.log("ENS name not found or unavailable");
  });
}

// https://www.npmjs.com/package/eth-registrar-ens
// https://github.com/ethereum/ens-registrar-dapp/blob/master/app/imports/lib/ethereum.js
export const initRegistrar = async () => {
  try {
    ens = new ENS(web3);
    
    registrar = await new Registrar(web3, ens, 'eth', 7, function(err, result) {
      //TODO: Check that the registrar is correctly instanciated
      console.log('done initializing', err, result);
    });
    return registrar;
    //console.log(registrar);
    //console.log(registrar.contract);
    //const result = registrar.startAuction(namehash(name), { from: '0x7c20badacd20f09f972013008b5e5dae82670c8d', gas: 4700000 });
  } catch(error) {
    console.log(`ENS init registrar error: ${error}`);
  }
}
