import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { addTask, fetchAllTask } from 'actions';
import './NewTaskInput.scss';

const NewTaskInput = () => {
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState('');

  const onAddNewTask = () => {
    const title = inputValue.trim();
    
    if (title !== '') {
      const data = {
        title: title,
      };
      dispatch(addTask(data)).then(() => {
        dispatch(fetchAllTask());
      });
    }
    setInputValue('');
  };

  const onKeyDown = useCallback((event) => {
    if (event.key === 'Enter') {
      onAddNewTask();
    }
  });

  return (
    <section className="new-task">
      <button type="button" className="new-task-button" onClick={onAddNewTask}>
        <i className="fas fa-plus"></i>
      </button>
      <input type="text" className="new-task-input"
        placeholder="add new task"
        onKeyDown={onKeyDown}
        onChange={e => setInputValue(e.target.value)}        
        value={inputValue}
      />
    </section>
  );
}

export default NewTaskInput;
