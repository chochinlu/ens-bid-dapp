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
      networkId: null
    };
  }

  fetchAccounts() {
    const { web3 } = window;
    web3.eth.getAccounts((err, accounts) => {
      if (err) {
        this.setState({message: messages.LOAD_MATAMASK_WALLET_ERROR});
      } else {
        const message = accounts.length === 0
          ? messages.EMPTY_METAMASK_ACCOUNT
          : '';
        this.setState({message});

        const account = accounts.length === 0
          ? ''
          : accounts[0];
        this.props.setAccount(account);
      }
    });
  }

  fetchNetwork() {
    const { web3 } = window;

    web3.version.getNetwork((err, netId) => {
      if (err) {
        this.setState({networkId: null, yarmessage: messages.NETWORK_ERROR});
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
      case '4':
        return 'RINKEBY';
      case '42':
        return 'KOVAN';
      default:
        return 'UNKNOWN';
    }
  }

  componentDidMount() {
    this.fetchAccounts();
    this.fetchNetwork();
    this.AccountInterval = setInterval(() => this.fetchAccounts(), 1000);
    this.NetworkInterval = setInterval(() => this.fetchNetwork(),  6000);
  }

  componentWillUnmount() {
    clearInterval(this.AccountInterval);
    clearInterval(this.NetworkInterval);
  }

  render() {
    const accountInfo = this.props.account !== '' &&
      <p>{messages.METAMASK_ACCOUNT + this.props.account}</p>;

    const alert = this.state.message &&
      <p>{this.state.message}</p>;

    const currentNetwork = this.state.networkId &&
      <p>Current Network: {this.getNetworkName(this.state.networkId)}</p>;

    return (
      <div className='MetaMaskWallet'>
        <h1>MetaMask Wallet</h1>
        {accountInfo}
        {alert}
        {currentNetwork}
      </div>
    );
  }
};