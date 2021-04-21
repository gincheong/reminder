import React, { useState, forwardRef, useRef } from 'react';
import propTypes from 'prop-types';
import './Input.scss';

const Input = forwardRef((props, ref) => {
  const [value, setValue] = useState(props.value ? props.value : '');

  const onChangeInput = (event) => {
    setValue(event.target.value);
    
    if (props.notNull && !event.target.value) {
      ref.current.style.outline = '1px solid #db706c';
    } else {
      if (ref.current.style.outline !== '') {
        ref.current.style.outline = '';
      }
    }
  }

  const onClickClear = () => {
    setValue('');
  }

  return (
    <>
      <input type={props.type}
            value={value}
            onChange={onChangeInput}
            className="card-modal-input"
            placeholder={props.placeholder}
            spellCheck="false"
            ref={ref}
      />
      {props.clearButton ? (
        <div className="card-modal-input-clear" onClick={onClickClear}>
          <i className="fas fa-eraser"></i>
        </div>
      ) : ''}
    </>
  );
});

export default Input;

Input.propTypes = {
  type: propTypes.string,
  value: propTypes.string,
  clearButton: propTypes.bool,
  notNull: propTypes.bool,
  placeholder: propTypes.string
};
