import React, { Component } from 'react';

import './Textarea.css';

class Textarea extends Component {
  constructor (props) {
    super(props);
    this.state = {
      value: this.props.value ? this.props.value : ''
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);

    this.textareaRef = React.createRef();
  }

  render () {
    return (
      <textarea value={this.state.value}
                onChange={this.onChangeHandler}
                className="card-modal-textarea"
                rows={this.props.rows}
                ref={this.textareaRef}
                spellCheck='false'
      />
    );
  }

  onChangeHandler (e) {
    this.setState({
      value: e.target.value,
    });
  }
}

export default Textarea;
