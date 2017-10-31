// @flow weak
import React from 'react';
import Button from 'material-ui/Button';
import Card from 'material-ui/Card';
import './FinalizeAuctionInfo.css';

export const FinalizeAuctionInfo = (props) => (
  <Card raised>
    <div className='FinalizeAuctionInfo'>
      <h3>ENS: {props.searchName}.eth</h3>
      <p>
        Congratulations! You've owned the <strong>{props.searchName}.eth</strong> domain name!
      </p>
      <div className='FinalizeAuctionInfo-actions'>
        <Button raised onClick={() => props.backToSearch()}>
          BACK TO SEARCH
        </Button>
        <Button raised>MY ENS LIST</Button>
      </div>
    </div>
  </Card>
);