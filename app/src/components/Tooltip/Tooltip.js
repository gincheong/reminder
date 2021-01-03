import React, { Component } from 'react';

import './Tooltip.css';

// ! 너무 부가작업이라 잠시 미뤄두기

class Tooltip extends Component {
  constructor (props) {
    super(props);
    this.state = {
      left: 0,
      top: 0
    }
    this.getClickPosition = this.getClickPosition.bind(this)

    this.tooltipRef = React.createRef();
  }

  componentDidUpdate () {
    // console.log(this.state);
  }

  render () {
    return (
      <>
        <div className="tooltip" ref={this.tooltipRef}
          style={{
            left: `${this.state.left - 36}px`,
            top: `${this.state.top - 45}px`
          }}>  
          {this.props.message}
        </div>
        <span onClick={this.getClickPosition}>
          {this.props.children}
        </span>
      </>
    )
  }

  getClickPosition (event) {
    this.tooltipRef.current.classList.add('fade-tooltip-animation');
    // TODO : should remove class for animation repeattion
    // setTimeout(() => {
    //   this.tooltipRef.current.classList.remove('fade-tooltip-animation');
    //   // ! 더블클릭으로 삭제하면 modal이 닫히면서 오류 발생함
    // }, 300);
    this.setState({
      left: event.clientX,
      top: event.clientY,
    });
  }

}

export default Tooltip;