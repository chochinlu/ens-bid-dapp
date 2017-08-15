const Web3 = require('web3');
const web3 = new Web3();
const Tx = require('ethereumjs-tx');

web3.setProvider(new web3.providers.HttpProvider('https://ropsten.infura.io' + process.env.INFURA_API_KEY));

export const getBlockNumber = () => {
  return web3.eth.blockNumber;
};

export const getAddressBalanceLoad = (address) => {
  return web3.fromWei(web3.eth.getBalance(address), "ether").toString(10);
};

export const sendRawTransaction = (payload) => {
  let privateKey = new Buffer(payload.privateKey, 'hex');
  let rawTx = {
    nonce: '0x' + web3.eth.getTransactionCount(payload.from).toString(16),
    gasPrice: web3.eth.gasPrice, 
    from: payload.from,
    to: payload.to, 
    value: payload.value, 
    data: payload.data
  }
  const estimateGas = web3.eth.estimateGas(rawTx);
  rawTx.gasLimit = estimateGas;
  let tx = new Tx(rawTx);
  tx.sign(privateKey);

  let serializedTx = tx.serialize();

  // TODO async await for transactionHash
  web3.eth.sendRawTransaction("0x" + serializedTx.toString('hex'), function(err, hash) {
    if (!err)
      console.log("transactionHash", hash); // TODO listen transactionReceipt
    else 
      console.log("err", err);
  });
};

export const getEstimateGas = (payload) => {
  var result = web3.eth.estimateGas({
    from: payload.from,
    to: payload.to, 
    value: payload.value,
    data: payload.data
  });
  return result;
};