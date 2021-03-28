import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';

import { addTask, fetchAllTask } from 'actions';
import './NewTaskInput.scss';

const NewTaskInput = (props) => {
  const dispatch = useDispatch();
  const inputRef = useRef();

  function onAddNewTask() {
    const $input = inputRef.current;
    const title = $input.value.trim();

    if (title !== '') {
      const data = {
        title: title,
      };
      dispatch(addTask(data)).then(() => {
        dispatch(fetchAllTask());
      });
    }
    $input.value = '';
  };

  function onPressEnter(event) {
    if (event.key === 'Enter') {
      onAddNewTask();
    }
  }

  return (
    <section className="new-task">
      <button type="button" className="new-task-button" onClick={onAddNewTask}>
        <i className="fas fa-plus"></i>
      </button>
      <input type="text" className="new-task-input"
        placeholder="add new task"
        onKeyPress={onPressEnter}
        ref={inputRef}
      />
    </section>
  );
}

export default NewTaskInput;
