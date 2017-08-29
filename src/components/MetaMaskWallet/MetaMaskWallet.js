import React, {Component} from 'react';
import './MetaMaskWallet.css'

const messages = {
  'LOAD_MATAMASK_WALLET_ERROR': 'Load metamask wallet error, maybe try Metamask later, or upload a wallet json file.',
  'EMPTY_METAMASK_ACCOUNT': 'You can choose one MetaMask wallet by unlocking it',
  'METAMASK_ACCOUNT': 'You have choosen the MetamMask Wallet: ',
  'NETWORK_ERROR': 'Network error, please check it.'
};

export class MetaMaskWallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      account: '',
      networkId: null
    };
  }

  fetchAccounts() {
    const { web3 } = window;
    web3.eth.getAccounts((err, accounts) => {
      if (err) {
        this.setState({message: messages.LOAD_MATAMASK_WALLET_ERROR});
      } else {
        accounts.length === 0 
          ? this.setState({message: messages.EMPTY_METAMASK_ACCOUNT})
          : this.setState({account: accounts[0]});
      }
    });
  }

  fetchNetwork() {
    const { web3 } = window;

    web3 && web3.version && web3.version.getNetwork((err, netId) => {
      if (err) {
        this.setState({message: messages.NETWORK_ERROR});
      } else {
        this.setState({ networkId: netId })
      }
    });
  }

  getNetworkName(networkId) {
    switch (networkId) {
      case '1':
        return 'MAINNET';
      case '2':
        return 'MORDEN';
      case '3':
        return 'ROPSTEN';
      default:
        return 'UNKNOWN';
    }
  }

  componentDidMount() {
    this.fetchAccounts();
    this.fetchNetwork();
  }

  render() {

    const accountInfo = this.state.account !== '' &&
      <p>{messages.METAMASK_ACCOUNT + this.state.account}</p>

    const currentNetwork = this.state.networkId &&
      <p>Current Network: {this.getNetworkName(this.state.networkId)}</p>

    return (
      <div className='MetaMaskWallet'>
        <h1>MetaMask Wallet</h1>
        {accountInfo}
        {currentNetwork}
        <p>{this.state.message}</p>
      </div>
    );
  }
};