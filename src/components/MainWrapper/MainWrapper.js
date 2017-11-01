import React, {Component} from 'react';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import {SearchEns} from '../SearchEns/SearchEns';
// import {Content} from './Content'; 
// import {FAQ} from './FAQ';
import {About} from '../About/About';
import {AuctionWrapper} from '../AuctionWrapper/AuctionWrapper';
import './MainWrapper.css';

const Main = (props) => (
  <div className="Main">
    <div>
      <SearchEns {...props} />
      <About />
    </div>
  </div>
);

export class MainWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 'StartAuction'
    };
    this.setStep = this.setStep.bind(this);
  }

  setStep(name) {
    this.setState({step: name});
  }

  mainPage() {
    return this.props.page === 'main'
      ? (<Main
        {...this.state}
        {...this.props}
        setStep={this.setStep}/>)
      : (<AuctionWrapper
        {...this.props}
        step={this.state.step}
        setStep={this.setStep}/>);
  }

  snack() {
    return(
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={6000}
        open={this.props.warningOpen}
        onRequestClose={this.props.handleMessageClose}
        SnackbarContentProps={{ 'aria-describedby': 'message-id' }}
        message={< span id = "message-id">{this.props.warningMessage}</span>}
        action={[ 
          < IconButton 
            key="close" 
            aria-label="Close" 
            color="inherit" 
            onClick={this.props.handleMessageClose}> 
            <CloseIcon/> 
          </IconButton>]}/>
    )
  }

  render() {
    const mainPage = this.mainPage();
    const snack = this.snack();
    return (
      <div>
        {mainPage}
        {snack}
      </div>
    );
  }
}