import {Box} from './util';

const Web3 = require('web3');
const web3 = new Web3();
const Tx = require('ethereumjs-tx');
const Wallet = require('ethereumjs-wallet');

const setWeb3Provider = () => {
  web3.setProvider(new web3.providers.HttpProvider(process.env.REACT_APP_PROVIDER));
};

const CHAIN_ID = process.env.REACT_APP_CHAINID || 3;

setWeb3Provider();

export const getBlockNumber = () => web3.eth.blockNumber;

/**
 * @description get address balance
 * @param {*} address 
 */
export const getAddressBalance = address => 
  Box(address)
    .map(addr => web3.eth.getBalance(addr))
    .map(balance => web3.fromWei(balance, 'ether'))
    .fold(wei => wei.toString(10));


/**
 * @description extract address from private key
 * @param {*} privateKey 
 */
export const getAddressByPrivateKey = (privateKey) => {
  let privateKeyBuffer = new Buffer(privateKey, 'hex');
  let wallet = Wallet.fromPrivateKey(privateKeyBuffer);
  return "0x" + wallet.getAddress().toString('hex');
}

/**
 * @description send transaction from raw data
 * Example usage:
 * 
 * sendRawTransaction({
 *   from: '0x7c20badacd20f09f972013008b5e5dae82670c8d',
 *   to: '0xd6026ddc3a2be02a3577de714a98e24dc4a89dbf',
 *   value: '0x100',
 *   data: '',
 *   privateKey: PRIVATE_KEY
 * });
 * 
 * @param {*} payload 
 */
export const sendRawTransaction = async payload => {
  const {privateKey, from, to, value, data, gasPrice} = payload;

  const hexPivateKey = new Buffer(privateKey, 'hex');
  const customGasPrice = gasPrice || 21; 

  const rawTx = {
    // 交易的編號的 Primary Key，呼叫的時候會自動轉成 AUTO_INFREMANT
    nonce: '0x' + web3.eth.getTransactionCount(from).toString(16),  
    // 目前 Ethereum 網路的價格, default 21 Gwei
    gasPrice: web3.toHex(web3.toWei(customGasPrice, "shannon")), 
    // sender
    from,
    // receiver
    to, 
    // 多少以太幣，以 wei 為單位
    value, 
    // 打 contract 的時候需要認的 function call bytecode，或者 direct message
    data,

    chainId: CHAIN_ID
  };
  // 偵測要花多少 gas 才可以將 transaction 送出
  //rawTx.gasLimit = web3.toHex(getEstimateGas(rawTx));
  //console.log("estimateGas", getEstimateGas(rawTx));
  rawTx.gasLimit = web3.toHex(getEstimateGas(rawTx));
  //console.log("rawTx", rawTx);
  const tx = new Tx(rawTx);
  tx.sign(hexPivateKey);

  const serializedTx = tx.serialize();
  
  // TODO return transactionHash
  /*web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), (err, hash) => {
    if (!err)
      console.log(`transactionHash: ${hash}`); // TODO listen transactionReceipt
    else 
      console.log(`err: ${err}`);
  });*/
  //console.log('0x' + serializedTx.toString('hex'));
  let transactionHash = await web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'));
  console.log("transactionHash", transactionHash)
  return transactionHash;
};

/**
 * @description estimate gas of payload
 * @param {*} payload 
 */
export const getEstimateGas = payload => {
  const {from, to, value, data} = payload;
  return web3.eth.estimateGas({ from, to, value, data });
};

/**
 * @description search transactionHash for transaction receipt
 * @param {*} transactionHash 
 */
export const getTransactionReceipt = (transactionHash) => {
  return web3.eth.getTransactionReceipt(transactionHash);
};

/**
 * @description search transactionHans for transaction info
 * @param {*} transactionHash 
 */
export const getTransaction = (transactionHash) => {
  return web3.eth.getTransaction(transactionHash);
}

/**
 * @description return private key by keystore 
 * @param {*} keystore 
 * @param {*} passpharse 
 */
export const getPrivateKey = (keystore, passpharse) => {
  let wallet;
  let json;
  if (typeof keystore === 'object') {
    json = keystore;
  } else if (typeof keystore === 'string') {
    json = JSON.parse(keystore);
  }
  if (json.version === 3) {
    wallet = Wallet.fromV3(JSON.stringify(json), passpharse, true);
  } else if (json.version === 1) {
    wallet = Wallet.fromV1(JSON.stringify(json), passpharse);
  } else {
    wallet = Wallet.fromEthSale(JSON.stringify(json), passpharse);
  }
  return wallet.getPrivateKey().toString('hex');
}

/**
 * @description export ens json 
 * @param {*} name 
 * @param {*} ether 
 * @param {*} secret 
 * @param {*} address 
 */
export const ensJsonExport = (name, ether, secret, address) => {
  const nameSHA3 = web3.sha3(name);
  const secretSHA3 = web3.sha3(secret);
  const value = web3.toWei(ether, "ether");
  let result = {
    name,
    nameSHA3,
    value,
    address,
    secret,
    secretSHA3,
    owner: address,
  };
  return result;
}

/**
 * @description export gas fee with ether unit
 * @param {*} gasPrice
 * @param {*} estimateGas 
 */
export const getTransactionFee = (gasPrice, estimateGas) => {
  return web3.fromWei(web3.toWei(gasPrice, "shannon") * estimateGas, 'ether')
}