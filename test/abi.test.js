const abi = require('ethereumjs-abi');
const wallet = require('ethereumjs-wallet');
const Web3 = require('web3');
const web3 = new Web3();

const setWeb3Provider = () => {
  web3.setProvider(new web3.providers.HttpProvider(process.env.REACT_APP_PROVIDER));
};

setWeb3Provider();

const newBid = () => {
  let method = abi.methodID("newBid", ["bytes32"]).toString("hex");
  let encode = abi.rawEncode(["bytes32"], ["0xab59ae866315405d85a718c100a00532519203cfedf3d8f5a93a63a6464e311f"]).toString("hex");
  let byteData = "0x" + method + encode;
  console.log(byteData);
}

const startAuctionsAndBid = () => {
  let method = abi.methodID("startAuctionsAndBid", ["bytes32[]", "bytes32"]).toString("hex");
  let encode = abi.rawEncode(["bytes32[]", "bytes32"], 
  [["0x28c7013fb16fd3ded40b89513acf894252776e085ff82ae9a3e4f3cc6dd9792d"], "0xab59ae866315405d85a718c100a00532519203cfedf3d8f5a93a63a6464e311f"]).toString("hex");
  let byteData = "0x" + method + encode;
  console.log(byteData);
}

const startAuctionsAndBid2 = () => {
  let method = abi.methodID("startAuctionsAndBid", ["bytes32[]", "bytes32"]).toString("hex");
  let encode = abi.rawEncode(["bytes32[]", "bytes32"], 
  [[new Buffer("0x28c7013fb16fd3ded40b89513acf894252776e085ff82ae9a3e4f3cc6dd9792d", "hex")], "0xaf47ab9c02fd37ef8c51fc12428b671ddfb9d82cf1fa6858e64a28f73df8826b"]).toString("hex");
  //let encode2 = abi.rawEncode(["bytes32"], ["0xab59ae866315405d85a718c100a00532519203cfedf3d8f5a93a63a6464e311f"]).toString("hex");
  let byteData = "0x" + method + encode;
  console.log(byteData);
}

const decode = () => {
  let s = "0000000000000000000000000000000000000000000000000000000000000040af47ab9c02fd37ef8c51fc12428b671ddfb9d82cf1fa6858e64a28f73df8826b00000000000000000000000000000000000000000000000000000000000000015b3078323863373031336662313666643364656434306238393531336163663839343235323737366530383566663832616539613365346633636336646439373932645d00000000000000000000000000000000000000000000000000000000";
  let buffer = abi.rawDecode(["bytes32[]", "bytes32"], new Buffer(s, "hex"));
  console.log(buffer[0][0].toString("hex"));
  //console.log(new Buffer("0xab59ae866315405d85a718c100a00532519203cfedf3d8f5a93a63a6464e311f"));
  console.log(buffer[1].toString("hex"));
  
}

const web3encode = () => {
  //let encode = web3.eth.abi.encodeParameters(['bytes32[]', 'bytes32'], [['0x28c7013fb16fd3ded40b89513acf894252776e085ff82ae9a3e4f3cc6dd9792d'], '0xaf47ab9c02fd37ef8c51fc12428b671ddfb9d82cf1fa6858e64a28f73df8826b']);
  //console.log(encode);
}

const sha = () => {
  const name = "ethmask";
  const secert = "testing";
  console.log(name, web3.sha3(name));
  console.log(secert, web3.sha3(secert));
}

const unlock = () => {
  const keystore = '{"version":3,"id":"9069e9a7-4fd4-48c5-8fe5-8ea0cc692ded","address":"1ffa2169dc2096bb48cc4d4fc4daccc75f5da200","Crypto":{"ciphertext":"80d62be8bdca541ddf558b5bb5b9d166b5827a06054b2f13558de5072fa1e2df","cipherparams":{"iv":"614160c42ec8fa5ae3dd47f248ec0ca8"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"ffb798f502051218418565d9f08d29223cdf343d08b190151929ff807dccca4a","n":1024,"r":8,"p":1},"mac":"993fa16f725371588233ee311353f70640b3f800898fc1033ae51de09de6ac57"}}'
  const passpharse = 'OGRiMDdmNmU1YmUwNGUzODA0ODQ4MTc2';
  let w = wallet.fromV3(keystore, passpharse, true);
  console.log(w.getPrivateKey().toString('hex'));
}

console.log(web3.toWei(1, "shannon"), web3.fromWei(1000000000, "shannon"));


//newBid();
//startAuctionsAndBid2();
//decode();
//web3encode();
//sha();

unlock();