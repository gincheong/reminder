import propTypes from 'prop-types';
import React, { useCallback, useMemo, useRef } from 'react';
import './DoubleButton.scss';

const DoubleButton = (props) => {
  const beforeClickRef = useRef();
  const afterClickRef = useRef();

  const onClick = useCallback(() => {
    if (beforeClickRef.current.classList.contains('click')) {
      props.action();
    } else {
      beforeClickRef.current.classList.add('click');
      afterClickRef.current.classList.add('click');
    }
  }, []);

  const onMouseLeave = useCallback(() => {
    beforeClickRef.current.classList.remove('click');
    afterClickRef.current.classList.remove('click');
  }, []);

  return useMemo(() => (
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
  ), []); // Modal을 닫으면 DisMount될 컴포넌트이기에 dependency array 생략함
};

export default DoubleButton;

DoubleButton.propTypes = {
  action: propTypes.func, // 버튼에서 실행시킬 함수
  color: propTypes.string, // 2번째 버튼의 컬러코드
  beforeClick: propTypes.element, // 기본 상태의 버튼 jsx
  afterClick: propTypes.element // 1회 클릭 상태의 버튼 jsx
};