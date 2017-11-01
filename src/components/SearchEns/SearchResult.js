import React, {Component} from 'react';
import classNames from 'classnames';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import {checkCurrentUserOwned} from '../../lib/ensService';
import './SearchResult.css';

const getStep = (state, domainValue, owned) => {
  switch (state) {
    case 'Open':
    case 'Auction':
      return 'StartAuction';
    case 'Reveal':
      return 'RevealAuction'
    case 'Owned':
      if (domainValue !== 0) return 'AlreadyOwned'
      if (!owned) return 'AlreadyOwned'
      return 'FinalizeAuction';
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

  getCurrentStep() {
    const ownedByCurrentUser = checkCurrentUserOwned(
      this.props.searchResult.searchName,
      this.props.address
    );
    const step = getStep(
      this.props.searchResult.state,
      this.props.searchResult.value,
      ownedByCurrentUser
    );
    return step;
  }

  handleClick() {
    const step = this.getCurrentStep();
    
    //TODO: should use error component?
    if(step === undefined) alert('the domain name service is not available');
    if(step === 'AlreadyOwned') alert('The domain name has already owned');

    this.props.setStep(step);
    this.props.switchPage('auction');
  }

  domainNameAvailiable() {
    const step = this.getCurrentStep();
    const available = ['StartAuction', 'RevealAuction', 'FinalizeAuction'];
    return available.includes(step);
  }

  buyNowButton() {
    return (
      <div className="SearchResultBtn-active" onClick={this.handleClick}>
      <IconButton aria-label="Buy Now">
        <i className="material-icons">gavel</i>
      </IconButton>
    </div>
    )
  }

  noActionButton() {
    return (
      <div className="SearchResultBtn-inactive">
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