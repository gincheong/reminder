import React, { Component } from 'react';

import './Input.css';

class Input extends Component {
  constructor (props) {
    super(props);
    this.state = {
      value: this.props.value
    }
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  render () {
    return (
      <input type={this.props.type}
             className={this.props.className}
             value={this.state.value}
             onChange={this.onChangeHandler}
      />
    )
  }

  onChangeHandler (e) {
    this.setState({
      value: e.target.value
    });
  }
}

export default Input;
