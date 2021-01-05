import React, { Component } from 'react';

import './ModalButton.css';

class ModalButton extends Component {
  constructor (props) {
    super(props);

    this.buttonRef = React.createRef();

    this.colorAnimation = this.colorAnimation.bind(this);
    this.animationEndListener = this.animationEndListener.bind(this);
  }

  render () {
    return (
      <button type="button"
              className="modal-button"
              onClick={this.props.onClick ? this.props.onClick : this.colorAnimation}
              onDoubleClick={this.props.onDoubleClick}
              onAnimationEnd={this.animationEndListener}
              ref={this.buttonRef}
      >
        {this.props.children}
      </button>
    );
  }

  colorAnimation () {
    this.buttonRef.current.classList.add(this.props.animationname);
  }

  animationEndListener (event) {
    event.target.classList.remove(this.props.animationname)
  }
}

export default ModalButton;
