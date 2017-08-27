const Web3 = require('web3');
const web3 = new Web3();
import {ensAbiArray} from './ensAbiArray';
import {auctionRegistrarAbiArray} from './auctionRegistrarAbiArray';
import {deedAbiArray} from './deedAbiArray';
import {fifsRegistrarAbiArray} from './fifsRegistrarAbiArray';

console.log("PROVIDER", process.env.REACT_APP_PROVIDER);

web3.setProvider(new web3.providers.HttpProvider(process.env.REACT_APP_PROVIDER));

function Contracts() {}

Contracts.prototype.namehash = function(name) {
    var node = '0x0000000000000000000000000000000000000000000000000000000000000000';
    if (name !== '') {
        var labels = name.split(".");
        for(var i = labels.length - 1; i >= 0; i--) {
            node = web3.sha3(node + web3.sha3(labels[i]).slice(2), {encoding: 'hex'});
        }
    }
    return node.toString();
}

const ensContract = web3.eth.contract(ensAbiArray);

Contracts.prototype.ens = ensContract.at(process.env.ENS_ADDRESS);

const auctionRegistrarContract = web3.eth.contract(auctionRegistrarAbiArray);

Contracts.prototype.ethRegistrar = auctionRegistrarContract.at(Contracts.prototype.ens.owner(Contracts.prototype.namehash('eth')));

const deedContract = web3.eth.contract(deedAbiArray);

const fifsRegistrarContract = web3.eth.contract(fifsRegistrarAbiArray);

Contracts.prototype.testRegistrar = fifsRegistrarContract.at(Contracts.prototype.ens.owner(Contracts.prototype.namehash('test')));

var resolverContract = web3.eth.contract([
  {
    "constant": true,
    "inputs": [
      {
        "name": "interfaceID",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "node",
        "type": "bytes32"
      },
      {
        "name": "contentTypes",
        "type": "uint256"
      }
    ],
    "name": "ABI",
    "outputs": [
      {
        "name": "contentType",
        "type": "uint256"
      },
      {
        "name": "data",
        "type": "bytes"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "node",
        "type": "bytes32"
      },
      {
        "name": "x",
        "type": "bytes32"
      },
      {
        "name": "y",
        "type": "bytes32"
      }
    ],
    "name": "setPubkey",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "node",
        "type": "bytes32"
      }
    ],
    "name": "content",
    "outputs": [
      {
        "name": "ret",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "node",
        "type": "bytes32"
      }
    ],
    "name": "addr",
    "outputs": [
      {
        "name": "ret",
        "type": "address"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "node",
        "type": "bytes32"
      },
      {
        "name": "contentType",
        "type": "uint256"
      },
      {
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "setABI",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "node",
        "type": "bytes32"
      }
    ],
    "name": "name",
    "outputs": [
      {
        "name": "ret",
        "type": "string"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "node",
        "type": "bytes32"
      },
      {
        "name": "name",
        "type": "string"
      }
    ],
    "name": "setName",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "node",
        "type": "bytes32"
      },
      {
        "name": "hash",
        "type": "bytes32"
      }
    ],
    "name": "setContent",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "node",
        "type": "bytes32"
      }
    ],
    "name": "pubkey",
    "outputs": [
      {
        "name": "x",
        "type": "bytes32"
      },
      {
        "name": "y",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "node",
        "type": "bytes32"
      },
      {
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "setAddr",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "ensAddr",
        "type": "address"
      }
    ],
    "payable": false,
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "node",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "a",
        "type": "address"
      }
    ],
    "name": "AddrChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "node",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "hash",
        "type": "bytes32"
      }
    ],
    "name": "ContentChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "node",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "name",
        "type": "string"
      }
    ],
    "name": "NameChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "node",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "name": "contentType",
        "type": "uint256"
      }
    ],
    "name": "ABIChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "node",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "x",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "y",
        "type": "bytes32"
      }
    ],
    "name": "PubkeyChanged",
    "type": "event"
  }
]);

Contracts.prototype.getAddr = function(name) {
  var node = Contracts.prototype.namehash(name)
  var resolverAddress = Contracts.prototype.ens.resolver(node);
  if (resolverAddress === '0x0000000000000000000000000000000000000000') {
    return resolverAddress;
  }
  return resolverContract.at(resolverAddress).addr(node);
}

let publicResolverAddress = process.env.REACT_APP_PUBLIC_RESOLVER || Contracts.prototype.getAddr('resolver.eth');
Contracts.prototype.publicResolver = resolverContract.at(publicResolverAddress);

var reverseRegistrarContract = web3.eth.contract([
  {
    "constant": false,
    "inputs": [
      {
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "claim",
    "outputs": [
      {
        "name": "node",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "ens",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "node",
    "outputs": [
      {
        "name": "ret",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "rootNode",
    "outputs": [
      {
        "name": "",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "ensAddr",
        "type": "address"
      },
      {
        "name": "node",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "type": "constructor"
  }
]);
Contracts.prototype.reverseRegistrar = reverseRegistrarContract.at(Contracts.prototype.ens.owner(Contracts.prototype.namehash('addr.reverse')));

Contracts.prototype.getContent = function(name) {
  var node = Contracts.prototype.namehash(name)
  var resolverAddress = Contracts.prototype.ens.resolver(node);
  if (resolverAddress === '0x0000000000000000000000000000000000000000') {
    return "0x0000000000000000000000000000000000000000000000000000000000000000";
  }
  return resolverContract.at(resolverAddress).content(node);
}

module.exports = new Contracts();