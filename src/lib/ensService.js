const Web3 = require('web3');
const web3 = new Web3();
const ENS = require('ethereum-ens');

const setWeb3Provider = () => {
  const API_KEY = process.env.INFURA_API_KEY; //TODO: should check if is empty string
  console.log(``)
  const provider = `https://ropsten.infura.io/${API_KEY}`;
  web3.setProvider(new web3.providers.HttpProvider(provider));
};

setWeb3Provider();

export const searchAddress = (address) => {
  const ens = new ENS(web3);
  ens.resolver(address).addr().then(function(addr) { 
    console.log(addr);
  }).catch(function(err) {
    console.log("ENS name not found or unavailable");
  });
}
