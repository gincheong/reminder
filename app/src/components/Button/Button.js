import React, { Component } from 'react';

import './Button.css';

class Button extends Component {
  render () {
    return (
      <div className="button" onClick={this.props.event}>
        {this.props.name}
      </div>
    )
  }
}

export default Button;