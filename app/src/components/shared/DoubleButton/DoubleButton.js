import React, { useRef } from 'react';

import './DoubleButton.scss';

/** props
 * @param {function} action 버튼이 실행시킬 함수
 * @param {string} color 2번째 버튼의 컬러코드
 * @param {jsx} beforeClick 기본 버튼의 템플릿
 * @param {jsx} afterClick 2번째 버튼의 템플릿
 * @returns {jsx} jsx
 */
const DoubleButton = (props) => {
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
    <button type="button" className="DoubleButton" onClick={onClick}
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

export default DoubleButton;


/**
 * 
 * ModalButton 쪽에도 DoubleButton 적용하기
 * 
 */