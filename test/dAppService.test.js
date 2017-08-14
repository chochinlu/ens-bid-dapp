const Web3 = require('web3');
const web3 = new Web3();
const Tx = require('ethereumjs-tx');

web3.setProvider(new web3.providers.HttpProvider('https://ropsten.infura.io' + process.env.INFURA_API_KEY));

console.log(process.env.PRIVATE_KRY);

let payload = {
  from: "0x7c20badacd20f09f972013008b5e5dae82670c8d",
  to: "0xd6026ddc3a2be02a3577de714a98e24dc4a89dbf",
  value: "0x100",
  data: "",
  privateKey: process.env.PRIVATE_KRY
};

function sendRawTransaction(payload) {
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
  console.log(serializedTx.toString('hex'));

  web3.eth.sendRawTransaction("0x" + serializedTx.toString('hex'), function(err, hash) {
    if (!err)
      console.log(hash); // TODO listen transactionReceipt
    else 
      console.log("err", err);
  });
}

sendRawTransaction(payload);