import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import propTypes from 'prop-types';
import { fetchAllTask, deleteTask, updateTask } from 'actions';
import { Input, Textarea } from 'components';
import { DoubleButton } from 'components/shared';
import './CardModal.scss';

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

    document.addEventListener('keyup', onEscKeyup);
    return () => { // when component dismount
      document.removeEventListener('keyup', onEscKeyup);
    };
  }, []);

  const renderModal = () => {
    const task = store.get('task');
    const task_date = task.get('task_date')?.substr(0, 10) ?? '';

    return (
      <main className="card-modal-content">
        <div className="card-modal-title">
          <i className="fas fa-list"></i>
          <Input type="text" value={task.get('title')} name="title" ref={titleRef}
            clearButton notNull placeholder="Title Must be Filled" />
        </div>
        <div className="card-modal-date">
          <i className="fas fa-calendar"></i>
          <Input type="date" value={task_date} name="task_date" ref={taskDateRef}
            clearButton />
        </div>
        <div className="card-modal-alarm">
          <i className="fas fa-bell"></i>
          <Input type="datetime-local" value={task.get('alarm')} name="alarm" ref={alarmRef}
            clearButton />
        </div>
        <div className="card-modal-description">
          <i className="fas fa-ellipsis-v"></i>
          <Textarea value={task.get('description')} rows={10} name="description" ref={descriptionRef} />
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
      { props.id && renderModal() }
      <footer className="card-modal-footer">
        <DoubleButton color="#f2f2f2" action={onClose}
          beforeClick={<i className="fas fa-angle-left"></i>}
          afterClick={<i className="fas fa-angle-double-left"></i>}
        />
        <DoubleButton color="#567ace" action={onSave}
          beforeClick={<i className="fas fa-check"></i>}
          afterClick={<i className="fas fa-save"></i>}
        />
        <DoubleButton color="#db706c" action={onDelete}
          beforeClick={<i className="fas fa-times"></i>}
          afterClick={<i className="fas fa-trash-alt"></i>}
        />
      </footer>
    </section>
  );
};

export default CardModal;

CardModal.propTypes = {
  id: propTypes.number,
  toggleModal: propTypes.func
};
