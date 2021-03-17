import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAllTask, deleteTask, updateTask } from 'actions';
import { ModalButton, Input, Textarea } from 'components';
import './CardModal.css';

const CardModal = (props) => {
  const store = useSelector(store => store.taskReducer);
  const dispatch = useDispatch();

  const modalRef = useRef();
  const titleRef = useRef();
  const taskDateRef = useRef();
  const alarmRef = useRef();
  const descriptionRef = useRef();

  useEffect(() => {
    const onEscKeyup = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // mount
    document.addEventListener('keyup', onEscKeyup);
    return () => {
      // unmount
      document.removeEventListener('keyup', onEscKeyup);
    };
  }, []);

  const renderModal = () => {
    let { task_date } = store.task;
    if (task_date) {
      task_date = task_date.substr(0, 10);
    }

    return (
      <main className="card-modal-content">
        <div className="card-modal-title">
          <i className="fas fa-list"></i>
          <Input type="text" value={store.task.title} name="title" ref={titleRef}
            clearButton notNull placeholder="Title Must be Filled" />
        </div>
        <div className="card-modal-date">
          <i className="fas fa-calendar"></i>
          <Input type="date" value={task_date} name="task_date" ref={taskDateRef}
            clearButton />
        </div>
        <div className="card-modal-alarm">
          <i className="fas fa-bell"></i>
          <Input type="datetime-local" value={store.task.alarm} name="alarm" ref={alarmRef}
            clearButton />
        </div>
        <div className="card-modal-description">
          <i className="fas fa-ellipsis-v"></i>
          <Textarea value={store.task.description} rows='10' name="description" ref={descriptionRef} />
        </div>
      </main>
    );
  }

  const onAnimationEnd = (event) => {
    if (event.animationName === 'close-modal') {
      props.toggleModal(undefined);
      dispatch(fetchAllTask());
    }
  }

  const onSave = () => {
    // TOOD: Action 만들기?
    const title = titleRef.current.value;
    if (!title) { return; }
    const task_date = taskDateRef.current.value;
    const alarm = alarmRef.current.value
    const description = descriptionRef.current.value;
    const data = new FormData();
    data.append('title', title);
    data.append('task_date', task_date);
    data.append('alarm', alarm);
    data.append('description', description);

    dispatch(updateTask(props.id, data)).then(() => {
      onClose();
    });
  }

  const onDelete = () => {
    dispatch(deleteTask(props.id)).then(() => {
      onClose();
    });
  }
  
  const onClose = () => {
    modalRef.current.classList.add('close-modal-animation');
  }

  return (
    <section className="card-modal open-modal-animation" ref={modalRef}
      onAnimationEnd={onAnimationEnd}
    >
      <header className="card-modal-header">
        <span className="card-modal-name">
          Task Description
        </span>
      </header>
      {props.id !== undefined ? renderModal() : undefined}
      <footer className="card-modal-footer">
        <ModalButton onDoubleClick={onSave} animationname="modal-button-save">
          <i className="fas fa-save"></i>
        </ModalButton>
        <ModalButton onDoubleClick={onDelete} animationname="modal-button-delete">
          <i className="fas fa-trash-alt"></i>
        </ModalButton>
        <ModalButton onClick={onClose}>
          <i className="fas fa-times"></i>
        </ModalButton>
      </footer>
    </section>
  );
};

export default CardModal;
  