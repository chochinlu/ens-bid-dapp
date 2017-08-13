const Web3 = require('web3');
const web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider('https://ropsten.infura.io/YJ5zuNbAkmYQY3kFn4cZ'));

export const getBlockNumber = () => {
  return web3.eth.blockNumber;
};

export const getAddressBalanceLoad = (address) => {
  return web3.fromWei(web3.eth.getBalance(address), "ether").toString(10);
};