import React, { useRef } from 'react';

import './ModalButton.css';

const ModalButton = (props) => {
  const buttonRef = useRef();

  const colorAnimation = () => {
    buttonRef.current.classList.add(props.animationname);
  };

  const onAnimationEnd = (event) => {
    event.target.classList.remove(props.animationname);
  };

  return (
    <button type="button" className="modal-button"
            onClick={props.onClick ? props.onClick : colorAnimation}
            onDoubleClick={props.onDoubleClick}
            onAnimationEnd={onAnimationEnd}
            ref={buttonRef}
    >
      {props.children}
    </button>
  );
};

export default ModalButton;