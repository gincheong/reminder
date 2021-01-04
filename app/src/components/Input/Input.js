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

    this.inputRef = React.createRef();
  }

  render () {
    return (
      <>
        <input type={this.props.type}
              value={this.state.value}
              onChange={this.onChangeHandler}
              className="card-modal-input"
              placeholder={this.props.placeholder}
              spellCheck="false"
              ref={this.inputRef}
        />
        {this.props.clearButton ? (
          <div className="card-modal-input-clear" onClick={this.clearEvent}>
            <i className="fas fa-eraser"></i>
          </div>
        ) : undefined }
      </>
    )
  }

  onChangeHandler (e) {
    this.setState({
      value: e.target.value
    });

    if (this.props.notNull && !e.target.value) {
      this.inputRef.current.style.outline = '1px solid #db706c';
    } else {
      this.inputRef.current.style.outline = '';
    }
  }

  clearEvent (e) {
    this.setState({
      value: ''
    });
  }

}

export default Input;
