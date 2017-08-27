/**
 * ENS FLOW: https://docs.ens.domains/en/latest/userguide.html
 * 
 * ENS Bid Flow
 *   STEP 1: Check `entries`
 *   STEP 2: `startAuction`
 *   STEP 3: Check `entries` and `newBid`
 *   STEP 4: Check `entries` and `unsealBid`
 *   STEP 5: Check `entries` and `finalizeAuction`
 */

const Web3 = require('web3');
const web3 = new Web3();
const ENS = require('ethereum-ens');
const contracts = require('../abi/contracts.js');
const abi = require('ethereumjs-abi');
const dAppService = require('./dAppService.js');

let ens;

const setWeb3Provider = () => {
  web3.setProvider(new web3.providers.HttpProvider(process.env.REACT_APP_PROVIDER));
};

setWeb3Provider();

const mode = ["Open", "Auction", "Owned", "Forbidden", "Reveal", "NotYetAvailable"];

/**
 * @description 查詢這個 address 的 resolver
 * 
 * Example Usage:
 *   getAddressByEns("foobar.eth"); // 需用全名
 * 
 * @param {*} address 
 */
export const getAddressByEns = (address) => {
  ens = new ENS(web3, process.env.REACT_APP_ENS_ADDRESS);
  return ens.resolver(address).addr();
}

/**
 * @description STEP 1: 確認一下該.eth狀態，回傳 tuple 多維度資訊
 * https://github.com/ethereum/ens/blob/master/contracts/HashRegistrarSimplified.sol#L174
 * 
 * Example Usage: 
 *   entries("foobar");  // 只需搜尋需要註冊的名稱
 * 
 * @param {*} name 
 * @returns {array} tuple
 */
export const entries = (name) => {
  let entriesResult = contracts.ethRegistrar.entries(web3.sha3(name));
  let entries = {
    "state": mode[entriesResult[0].toString()],
    "deed": entriesResult[1],
    "registrationDate": new Date(entriesResult[2].toNumber() * 1000),
    "value": entriesResult[3].toNumber(),
    "highestBid": entriesResult[4].toNumber()
  };
  return entries;
}

/**
 * @description 如果 entires[0] 回傳是5，則代表"soft launch"結束後可以開標
 * @param {*} name 
 */
export const getAllowedTime = (name) => {
  return new Date(contracts.ethRegistrar.getAllowedTime(web3.sha3(name)) * 1000);
}

/**
 * @description STEP 2: 開標，選擇網域名稱並且開標
 * https://github.com/ethereum/ens/blob/master/contracts/HashRegistrarSimplified.sol#L296
 * return transactionHash
 * @param {*} name 
 * @param {*} privateKey
 * @returns {string} transactionHash
 */
export const startAuction = (name, privateKey) => {
  let fromAddress = dAppService.getAddressByPrivateKey(privateKey);
  let ethRegistrarAddress = contracts.ens.owner(contracts.namehash('eth'));
  let byteData = "0x" + 
                abi.methodID("startAuction", [ "bytes32" ]).toString("hex") + 
                abi.rawEncode([ "bytes32" ], [ web3.sha3(name) ]).toString("hex");
  const payload = {
    from: fromAddress,
    to: ethRegistrarAddress,
    value: '0x0',
    data: byteData,
    privateKey: privateKey
  };
  return dAppService.sendRawTransaction(payload);
}

/**
 * TODO: 輸出 JSON 格式，可以允許匯入，順便支援 ens.domains 的格式
 * 
 * @description STEP 3: 加密投標資訊，選定網域名稱設定混淆投標金額以及密碼
 * https://github.com/ethereum/ens/blob/master/contracts/HashRegistrarSimplified.sol#L333
 * @param {*} name 
 * @param {*} wei 
 * @param {*} secret
 * @param {*} privateKey
 * @returns {string} bid hash
 */
export const shaBid = (name, ether, secret, privateKey) => {
  let fromAddress = dAppService.getAddressByPrivateKey(privateKey);
  return contracts.ethRegistrar.shaBid(web3.sha3(name), fromAddress, web3.toWei(ether, "ether"), web3.sha3(secret));
}

/**
 * @description STEP 3: 投標，將加密後的資訊發送至合約
 * https://github.com/ethereum/ens/blob/master/contracts/HashRegistrarSimplified.sol#L350
 * @param {*} name 
 * @param {*} ether 
 * @param {*} secret 
 * @param {*} privateKey 
 * @returns {string} transactionHash
 */
export const newBid = (name, ether, secret, privateKey) => {
  let fromAddress = dAppService.getAddressByPrivateKey(privateKey);
  let ethRegistrarAddress = contracts.ens.owner(contracts.namehash('eth'));
  let bid = contracts.ethRegistrar.shaBid(web3.sha3(name), fromAddress, web3.toWei(ether, "ether"), web3.sha3(secret));
  let byteData = "0x" +
                abi.methodID("newBid", [ "bytes32" ]).toString("hex") +
                abi.rawEncode([ "bytes32" ], [ bid ]).toString("hex");
  const payload = {
    from: fromAddress,
    to: ethRegistrarAddress,
    value: web3.toHex(web3.toWei(ether, "ether")),
    data: byteData,
    privateKey: privateKey
  };
  return dAppService.sendRawTransaction(payload);
}

/**
 * @description STEP 4: 揭標，將資訊發送至合約
 * https://github.com/ethereum/ens/blob/master/contracts/HashRegistrarSimplified.sol#L381
 * @param {*} name 
 * @param {*} ether 
 * @param {*} secret 
 * @param {*} privateKey 
 * @returns {string} transactionHash
 */
export const unsealBid = (name, ether, secret, privateKey) => {
  let fromAddress = dAppService.getAddressByPrivateKey(privateKey);
  let ethRegistrarAddress = contracts.ens.owner(contracts.namehash('eth'));
  let byteData = "0x" +
                abi.methodID("unsealBid", [ "bytes32", "uint", "bytes32" ]).toString("hex") +
                abi.rawEncode([ "bytes32" ], [ web3.sha3(name) ]).toString("hex") +
                abi.rawEncode([ "uint" ], [ web3.toWei(ether, "ether") ]).toString("hex") + 
                abi.rawEncode([ "bytes32" ], [ web3.sha3(secret) ]).toString("hex");
  const payload = {
    from: fromAddress,
    to: ethRegistrarAddress,
    value: '0x0',
    data: byteData,
    privateKey: privateKey
  };
  return dAppService.sendRawTransaction(payload);
}

/**
 * @description STEP 5: 結標，將網域名發送至合約以完成結標，如果多人得標，將會退回第一名與第二名間差額的標金
 * https://github.com/ethereum/ens/blob/master/contracts/HashRegistrarSimplified.sol#L458
 * @param {*} name 
 * @param {*} privateKey
 * @returns {string} transactionHash
 */
export const finalizeAuction = (name, privateKey) => {
  let fromAddress = dAppService.getAddressByPrivateKey(privateKey);
  let ethRegistrarAddress = contracts.ens.owner(contracts.namehash('eth'));
  let byteData = "0x" +
                abi.methodID("finalizeAuction", [ "bytes32" ]).toString("hex") +
                abi.rawEncode([ "bytes32" ], [ web3.sha3(name) ]).toString("hex");
  const payload = {
    from: fromAddress,
    to: ethRegistrarAddress,
    value: '0x0',
    data: byteData,
    privateKey: privateKey
  };
  return dAppService.sendRawTransaction(payload);
}

/**
 * @description 轉移網域所有權，整個網域移交給另外一個帳戶管理，這個網域不再屬於你
 * https://github.com/ethereum/ens/blob/master/contracts/HashRegistrarSimplified.sol#L475
 * @param {*} name 
 * @param {*} toAddress 
 * @param {*} privateKey 
 * @returns {string} transactionHash
 */
export const transfer = (name, toAddress, privateKey) => {
  let fromAddress = dAppService.getAddressByPrivateKey(privateKey);
  let ethRegistrarAddress = contracts.ens.owner(contracts.namehash('eth'));
  let byteData = "0x" +
                abi.methodID("transfer", [ "bytes32", "address" ]).toString("hex") +
                abi.rawEncode([ "bytes32" ], [ web3.sha3(name) ]).toString("hex") + 
                abi.rawEncode([ "address" ], [ toAddress ]).toString("hex");
  const payload = {
    from: fromAddress,
    to: ethRegistrarAddress,
    value: '0x0',
    data: byteData,
    privateKey: privateKey
  };
  return dAppService.sendRawTransaction(payload);
}

/**
 * @description 如果忘記揭標，可以之後呼叫這隻取回一部分的標金
 * https://github.com/ethereum/ens/blob/master/contracts/HashRegistrarSimplified.sol#L434
 * @param {*} name 
 * @param {*} ether 
 * @param {*} secret 
 * @param {*} privateKey 
 * @returns {string} transactionHash
 */
export const cancelBid = (name, ether, secret, privateKey) => {
  let fromAddress = dAppService.getAddressByPrivateKey(privateKey);
  let ethRegistrarAddress = contracts.ens.owner(contracts.namehash('eth'));
  let bid = contracts.ethRegistrar.shaBid(web3.sha3(name), web3.toWei(ether, "ether"), web3.sha3(secret));
  let byteData = "0x" +
                abi.methodID("cancelBid", [ "address", "bytes32" ]).toString("hex") +
                abi.rawEncode([ "address" ], [ fromAddress ]).toString("hex") + 
                abi.rawEncode([ "bytes32" ], [ bid ]).toString("hex");
  const payload = {
    from: fromAddress,
    to: ethRegistrarAddress,
    value: '0x0',
    data: byteData,
    privateKey: privateKey
  };
  return dAppService.sendRawTransaction(payload);
}

/**
 * @description 將網域歸還取得押金
 * https://github.com/ethereum/ens/blob/master/contracts/HashRegistrarSimplified.sol#L489
 * @param {*} name 
 * @param {*} privateKey 
 * @returns {string} transactionHash
 */
export const releaseDeed = (name, privateKey) => {
  let fromAddress = dAppService.getAddressByPrivateKey(privateKey);
  let ethRegistrarAddress = contracts.ens.owner(contracts.namehash('eth'));
  let byteData = "0x" +
                abi.methodID("releaseDeed", [ "bytes32", "address" ]).toString("hex") +
                abi.rawEncode([ "bytes32" ], [ web3.sha3(name) ]).toString("hex");
  const payload = {
    from: fromAddress,
    to: ethRegistrarAddress,
    value: '0x0',
    data: byteData,
    privateKey: privateKey
  };
  return dAppService.sendRawTransaction(payload); 
}

/**
 * @description 設定網域使用權，可以將網域與子網域交給別的帳戶操作，這個網域依然屬於你
 * https://github.com/ethereum/ens/blob/master/contracts/ENS.sol#L57
 * @param {*} name 需要加上網域名稱，如 testing.eth
 * @param {*} toAddress 
 * @param {*} privateKey 
 * @returns {string} transactionHash
 */
export const setEnsOwner = (name, toAddress, privateKey) => {
  let fromAddress = dAppService.getAddressByPrivateKey(privateKey);
  let byteData = "0x" +
                abi.methodID("setOwner", [ "bytes32", "address" ]).toString("hex") +
                abi.rawEncode([ "bytes32" ], [ web3.sha3(name) ]).toString("hex") +
                abi.rawEncode([ "address" ], [ toAddress ]).toString("hex");
  const payload = {
    from: fromAddress,
    to: process.env.REACT_APP_ENS_ADDRESS,
    value: '0x0',
    data: byteData,
    privateKey: privateKey
  };
  return dAppService.sendRawTransaction(payload); 
}

/**
 * @description 設定子網域使用權
 * https://github.com/ethereum/ens/blob/master/contracts/ENS.sol#L69
 * 
 * Example Usage:
 *   setEnsSubnodeOwner("testing.eth", "sub", "0x0", privateKey)
 * 
 * @param {*} name 
 * @param {*} sub 
 * @param {*} toAddress 
 * @param {*} privateKey 
 * @returns {string} transactionHash
 */
export const setEnsSubnodeOwner = (name, sub, toAddress, privateKey) => {
  let fromAddress = dAppService.getAddressByPrivateKey(privateKey);
  let byteData = "0x" +
                abi.methodID("setSubnodeOwner", [ "bytes32", "address" ]).toString("hex") +
                abi.rawEncode([ "bytes32" ], [ web3.sha3(name) ]).toString("hex") +
                abi.rawEncode([ "bytes32" ], [ web3.sha3(sub) ]).toString("hex") +
                abi.rawEncode([ "address" ], [ toAddress ]).toString("hex");
  const payload = {
    from: fromAddress,
    to: process.env.REACT_APP_ENS_ADDRESS,
    value: '0x0',
    data: byteData,
    privateKey: privateKey
  };
  return dAppService.sendRawTransaction(payload); 
}

/**
 * @description 設定解析器
 * https://github.com/ethereum/ens/blob/master/contracts/ENS.sol#L80
 * @param {*} name 
 * @param {*} resolver 
 * @param {*} privateKey 
 * @returns {string} transactionHash
 */
export const setEnsResolver = (name, resolver, privateKey) => {
  let fromAddress = dAppService.getAddressByPrivateKey(privateKey);
  let byteData = "0x" +
                abi.methodID("setResolver", [ "bytes32", "address" ]).toString("hex") +
                abi.rawEncode([ "bytes32" ], [ web3.sha3(name) ]).toString("hex") +
                abi.rawEncode([ "address" ], [ resolver ]).toString("hex");
  const payload = {
    from: fromAddress,
    to: process.env.REACT_APP_ENS_ADDRESS,
    value: '0x0',
    data: byteData,
    privateKey: privateKey
  };
  return dAppService.sendRawTransaction(payload); 
}

/**
 * @description 設定 TTL
 * https://github.com/ethereum/ens/blob/master/contracts/ENS.sol#L90
 * @param {*} name 
 * @param {*} ttl 
 * @param {*} privateKey 
 * @returns {string} transactionHash
 */
export const setEnsTTL = (name, ttl, privateKey) => {
  let fromAddress = dAppService.getAddressByPrivateKey(privateKey);
  let byteData = "0x" +
                abi.methodID("setTTL", [ "bytes32", "address" ]).toString("hex") +
                abi.rawEncode([ "bytes32" ], [ web3.sha3(name) ]).toString("hex") +
                abi.rawEncode([ "uint64" ], [ ttl ]).toString("hex");
  const payload = {
    from: fromAddress,
    to: process.env.REACT_APP_ENS_ADDRESS,
    value: '0x0',
    data: byteData,
    privateKey: privateKey
  };
  return dAppService.sendRawTransaction(payload); 
}

/**
 * https://github.com/ethereum/ens/blob/master/contracts/HashRegistrarSimplified.sol#L117
 */
export const registryStarted = () => {
  return contracts.ethRegistrar.registryStarted();
}

/**
 * @description STEP 1 確認一下該.eth狀態，回傳該網域的狀態
 * https://github.com/ethereum/ens/blob/master/contracts/HashRegistrarSimplified.sol#L139
 * @param {*} name 
 */
export const state = (name) => {
  return contracts.ethRegistrar.state(web3.sha3(name));
}
