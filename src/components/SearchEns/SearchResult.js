import React from 'react';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import './SearchResult.css';

const SearchResultItem = (props) => {
  return (  
    <Paper className="SearchResult-paper">
      <Typography type="title" component="p" className="SearchResult-typography SearchResult-typography-front">
        {props.name}.eth
      </Typography>
      <Typography type="title" component="p" className="SearchResult-typography SearchResult-typography-status">
        <p>Status</p>
        <p>{props.state}</p>
      </Typography>
      <div className="SearchResultBtn" onClick={() => this.props.handleClick()}>
        <IconButton aria-label="Buy Now">
          <i class="material-icons">shopping_cart</i>
        </IconButton>
      </div>
    </Paper>
  );
};

export class SearchResult extends Component {
  handleClick() {
    if ((this.props.result.searchName).length <= 7) return alert('should greater than 7 words');
    
    // validate user login
    if (!(this.props.address && this.props.privateKey)) return alert('should login first');

    let step = '';
    switch (this.props.result.state) {
      case 'Auction', 'Open':
        // 1. aution / open go to start acution
        step = 'StartAuction';
        break;
      case 'Reveal':
        // 2. reveal go to reveal auction
        step = 'RevealAuction';
        break;
      case 'Owned':
        // 3. owned go to finialze auction 
        // TODO check if the person should be the one finalize it
        step = 'FinalizeAuction';
        break;
      default:
        // 4. forbidden / not yet available do nothing
        alert('the domain name service is not available');
    }

    this.props.setStep(step);
    this.props.switchPage('auction');
  }
  
  render() {
    const result = this.props.result;
    return result &&
      (
        <div className="SearchResult">
          <SearchResultItem 
            name={result.searchName} 
            state={result.state}
            handleClick={this.handleClick()}
          />
        </div>
    );
  }
};