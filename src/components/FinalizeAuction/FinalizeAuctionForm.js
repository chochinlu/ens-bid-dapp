import React, {Component} from 'react';
import Button from 'material-ui/Button';
import {sealedBids} from '../../lib/ensService';
import {FinalizeAuctionConfirmDialog} from './FinalizeAuctionConfirmDialog';

const FormComponent = (props) => (
  <div>
    <form>
      <div>
        <label>
          Email:
          <input
            name="email"
            type="email"
            placeholder="youremail@example.com"
            value={props.email}
            onChange={props.handleChange}
          />
        </label>
        <label>
          Gas:
          <input
            name="gas"
            type="number"
            value={props.gas}
            onChange={props.handleChange}
          />
        </label>
      </div>
      <div>
        <Button
          raised
          label="Dialog"
          color="primary"
          onClick={props.handleOpen}
        >
          Confirm Submit
        </Button>
      </div>
    </form>
  </div>
);

export class FinalizeAuctionForm extends Component {
  state = {
    open: false
  };
  
  handleOpen = () => {
    if (!(this.props.address && this.props.privateKey)) {
      this.props.handleWarningMessageOpen("Should login first");
      return
    }

    const checkValue = sealedBids(
      this.props.searchResult.searchName,
      this.props.ethBid,
      this.props.secret,
      this.props.privateKey
    );
    if (checkValue === '0x0000000000000000000000000000000000000000') {
      this.props.handleWarningMessageOpen("Invalid sealed bids");
      return
    }

    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({open: false});
  }

  render() {
    return (
      <div>
        <h2>{this.props.searchResult.searchName}.eth</h2>
        <div>
          <p>Finalize Auction On</p>
          <div>{this.props.registratesAt.toString()}</div>
          <div>Finalization</div>
        </div>

        <FormComponent
          {...this.props}
          handleOpen={this.handleOpen}
        />

        {
          (this.state.open && this.props.address && this.props.privateKey) &&
          <FinalizeAuctionConfirmDialog
            {...this.props}
            open={this.state.open}
            handleClose={this.handleClose}
          />
        }
      </div>
    )
  }
};
  
