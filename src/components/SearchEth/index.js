import React, {Component} from 'react';
import './SearchEth.css';

export class SearchEth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      result: null
    };
    this.handleChange = this.handleChange.bind(this); 
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  render() {
    const result = this.state.result &&
      <div><h3>Search OutPut</h3></div>;

    return (
      <div className="SearchEth">
        <div className="SearchEth-search">
          <div>
            <input
              type="text"
              placeholder='.eth'
              value={this.state.value}
              onChange={this.handleChange}/>
          </div>
          <div className="SearchEth-btn">Search</div>
          <div className="SearchEth-btn">Clear</div>
        </div>
        {result}
      </div>
    );
  }
}
