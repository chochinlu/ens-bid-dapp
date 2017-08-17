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

// https://www.npmjs.com/package/eth-registrar-ens
// https://github.com/ethereum/ens-registrar-dapp/blob/master/app/imports/lib/ethereum.js
const initRegistrar = () => {
  /*return new Promise((resolve, reject) => {
    try {
      ens = new ENS(web3, ENS_ADDRESS);
      registrar = new Registrar(web3, ens, 'eth', 7, (err, result) => {
        if (err) {
          return reject(err);
        }
        //TODO: Check that the registrar is correctly instanciated
        console.log('done initializing', err, result)
        resolve();
      });
    } catch(e) {
      reject('Error initialiting ENS registrar: ' + e);
    }
  });*/
  ens = new ENS(web3, ENS_ADDRESS);
  registrar = new Registrar(web3, ens, 'eth', 7, (err, result) => {
    if (err) {
      console.log("err", err);
    }
    //TODO: Check that the registrar is correctly instanciated
    console.log('done initializing', err, result)
  });
}

initRegistrar();

// 要降版本才可以 work
export const searchAddress = (address) => {
  ens = new ENS(web3, ENS_ADDRESS);
  //console.log("resolver", ens.resolver);
  console.log(ens.resolver(address).addr());/*.then(function(addr) { 
    console.log(addr);
  }).catch(function(err) {
    console.log("ENS name not found or unavailable");
  });*/
}
