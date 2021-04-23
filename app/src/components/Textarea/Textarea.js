import React, { forwardRef, useState } from 'react';
import propTypes from 'prop-types';
import './Textarea.scss';

const Textarea = forwardRef((props, ref) => {
  const [value, setValue] = useState(props.value ? props.value : '');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <textarea className="card-modal-textarea"
              spellCheck="false" placeholder="add description"
              rows={props.rows}
              value={value}
              onChange={onChange}
              ref={ref}
    />
  );
});;

export default Textarea;

Textarea.propTypes = {
  value: propTypes.string,
  rows: propTypes.number
};
