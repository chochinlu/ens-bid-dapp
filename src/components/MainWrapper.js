import React, {Component} from 'react';
import {SearchEns} from './SearchEns';
import {Content} from './Content';
import {FAQ} from './FAQ';
import {About} from './About';
import {AuctionWrapper} from './AuctionWrapper/AuctionWrapper';
import './MainWrapper.css';

const Main = (props) => (
  <div>
    <SearchEns
      switchPage={props.switchPage} />
    <hr/>
    <Content />
    <FAQ />
    <About />
  </div>
);

export class MainWrapper extends Component {
  getPage() {
    switch (this.props.page) {
      case 'main':
        return (
          <Main
            switchPage={this.props.switchPage}
          />
        );
      case 'auction':
        return <AuctionWrapper />;
      default:
        return <Main/>;
    }
  }

  render() {
    return this.getPage();
  }
}