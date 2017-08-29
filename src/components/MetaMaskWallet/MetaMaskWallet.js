import React, {Component} from 'react';
import './MetaMaskWallet.css'

const messages = {
  'LOAD_MATAMASK_WALLET_ERROR': 'Load metamask wallet error, maybe try Metamask later, or upload a wallet json file.',
  'EMPTY_METAMASK_ACCOUNT': 'You can choose one MetaMask wallet by unlocking it',
  'METAMASK_ACCOUNT': 'You have choosen the MetamMask Wallet: '
};

export class MetaMaskWallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      account: ''
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

  componentDidMount() {
    this.fetchAccounts();
  }

  render() {

    const accountInfo = this.state.account !== '' &&
      <p>{messages.METAMASK_ACCOUNT + this.state.account}</p>

    return (
      <div className='MetaMaskWallet'>
        <h1>MetaMask Wallet</h1>
        {accountInfo}
        <p>{this.state.message}</p>
      </div>
    );
  }
};