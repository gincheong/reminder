import React, { useRef } from 'react';

import './ModalButton.scss';

const ModalButton = (props) => {
  const beforeClickRef = useRef();
  const afterClickRef = useRef();

  const onClick = () => {
    if (beforeClickRef.current.classList.contains('click')) {
      props.action();
    } else {
      beforeClickRef.current.classList.add('click');
      afterClickRef.current.classList.add('click');
    }
  };

  const onMouseLeave = () => {
    beforeClickRef.current.classList.remove('click');
    afterClickRef.current.classList.remove('click');
  };

  return (
    <button type="button" className="ModalButton" onClick={onClick}
      onMouseLeave={onMouseLeave}>
      <div className="BeforeClick" ref={beforeClickRef}>
        {props.beforeClick}
      </div>
      <div className="AfterClick" ref={afterClickRef}
        style={{color: props.color}}>
        {props.afterClick}
      </div>     
    </button>
  );
};

export default ModalButton;