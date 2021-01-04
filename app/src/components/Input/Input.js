import React, { Component } from 'react';

import './Input.css';

class Input extends Component {
  constructor (props) {
    super(props);
    this.state = {
      value: this.props.value ? this.props.value : ''
    }
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.clearEvent = this.clearEvent.bind(this);
  }

  render () {
    return (
      <>
        <input type={this.props.type}
              value={this.state.value}
              onChange={this.onChangeHandler}
              className="card-modal-input"
        />
        {this.props.clearButton ? (
          <div className="card-modal-input-clear" onClick={this.clearEvent}>
            <i className="fas fa-backspace"></i>
          </div>
        ) : undefined }
      </>
    )
  }

  onChangeHandler (e) {
    this.setState({
      value: e.target.value
    });
  }

  clearEvent (e) {
    this.setState({
      value: ''
    });
  }

}

export default Input;
