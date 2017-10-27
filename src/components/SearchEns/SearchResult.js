import React, {Component} from 'react';
import classNames from 'classnames';
import {checkBeforeNow} from '../../lib/util';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import './SearchResult.css';

const getStep = ({state, registrationDate}) => {
  switch (state) {
    case 'Open':
    case 'Auction':
      return 'StartAuction';
    case 'Reveal':
      // check the current time is before registration date or not
      // check this person if he is the first price bidder of this domain
      return checkBeforeNow(registrationDate)
      ? 'RevealAuction' : 'FinalizeAuction';
    // case 'Owned':
    //   TODO 
    //     - check after reveal state
    //     - to start another auction request 
    //   break;
    default:
      // forbidden / not yet available do nothing
      return undefined;
  }
}

export class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const step = getStep(this.props.searchResult);

    //TODO: should use error component?
    if(step === undefined) alert('the domain name service is not available');

    this.props.setStep(step);
    this.props.switchPage('auction');
  }

  domainNameAvailiable() {
    const {state} = this.props.searchResult;
    const available = ['Auction', 'Open', 'Reveal'];
    return available.includes(state);
  }

  buyNowButton() {
    return (
      <div className="SearchResultBtn" onClick={this.handleClick}>
      <IconButton aria-label="Buy Now">
        <i className="material-icons">shopping_cart</i>
      </IconButton>
    </div>
    )
  }

  noActionButton() {
    return (
      <div className="SearchResultBtn">
        <IconButton aria-label="Owned">
          <i className="material-icons">not_interested</i>
        </IconButton>
      </div>
    );
  }

  statusAndAction() {
    const domainNameAvailiable = this.domainNameAvailiable();
    const actionButton = domainNameAvailiable
      ? this.buyNowButton()
      : this.noActionButton();

    const statusClass = classNames(
      'SearchResult-status',
      domainNameAvailiable ? 'able': 'disable',
      domainNameAvailiable ? 'able-border': 'disable-border',
    );

    return (
      <div className="SearchResult-status-and-action">
        <div className={statusClass}>
          <p>{this.props.searchResult.state}</p>
        </div>
        {actionButton}
      </div>
    );
  }

  render() {
    const statusAndAction = this.statusAndAction();

    return (
      <div className="SearchResult">
        <Paper className="SearchResult-paper">
          <div className="SearchResult-paper-eth">
            <h2>{this.props.searchResult.searchName}.eth</h2>
          </div>
          {statusAndAction}
        </Paper>
      </div>
    );
  }
}