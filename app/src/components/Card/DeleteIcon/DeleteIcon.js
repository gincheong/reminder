import React from 'react';
import { useDispatch } from 'react-redux';

import { deleteTask, fetchAllTask } from 'actions';
import './DeleteIcon.scss';

export const DeleteIcon = (props) => {
  const dispatch = useDispatch();

  const deleteIconRef = React.useRef();
  const iconRef = React.useRef();
  const textRef = React.useRef();
  
  const onClick = () => {
    if (iconRef.current.classList.contains('click')) {
      dispatch(deleteTask(props.id)).then(() => dispatch(fetchAllTask()));
    } else {
      iconRef.current.classList.add('click');
      textRef.current.classList.add('click');
    }
  };

  const onMouseLeave = () => {
    iconRef.current.classList.remove('click');
    textRef.current.classList.remove('click');
  };

  return (
    <div className="DeleteIcon" onClick={onClick} ref={deleteIconRef}
      onMouseLeave={onMouseLeave}>
      <div className="Icon" ref={iconRef}>
        <i className="fas fa-minus-circle"></i>
      </div>
      <div className="Text" ref={textRef}>
        <i className="fas fa-trash-alt"></i>
      </div>
    </div>
  );

};

