import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';

import { deleteTask, fetchAllTask, updateTask } from 'actions';
import { DoubleButton } from 'components/shared';
// import { DeleteIcon } from './DeleteIcon/DeleteIcon';
import './Card.scss';

const Card = (props) => {
  const dispatch = useDispatch();
  const cardRef = useRef();
  
  const current = new Date();
  const todayDate = new Date(Date.UTC(current.getFullYear(), current.getMonth(), current.getDate()));
  const task_date = new Date(props.data.task_date);

  const onChangeHandler = (event) => {
    event.target.checked = event.target.checked ? true : false;
    
    const data = new FormData();
    data.append('title', props.data.title);
    data.append('completed', event.target.checked);
    dispatch(updateTask(props.data.id, data)).then(() => {
      dispatch(fetchAllTask());
    });
  };

  // Card Drag Event
  const onMouseDown = (event) => {
    const startX = event.clientX;
    
    const onMouseMove = (event) => {
      // 드래그에 따라 element 이동시킴
      cardRef.current.style.left = event.clientX - startX + 'px';
    };

    const onMouseUp = (event) => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      
      if (event.clientX === startX) {
        props.toggleModal(props.data.id);
      }

      const moveDistance = Math.abs(event.clientX - startX);
      if (cardRef.current.offsetWidth / 2.7 < moveDistance) {
        dragAnimation(event.clientX);        
      } else {
        cardRef.current.style.left = 0;
      }
    };

    // 마우스가 element를 벗어나는 경우를 위해 document에 이벤트리스너 등록
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const dragAnimation = () => {
    if (parseInt(cardRef.current.style.left) < cardRef.current.offsetWidth) {
      cardRef.current.style.left = parseInt(cardRef.current.style.left) + 50 + 'px'; // ?: 숫자 넣어도 되나
      requestAnimationFrame(dragAnimation);
    } else {
      deleteCard();
    }
  };

  const deleteCard = () => {
    dispatch(deleteTask(props.data.id)).then(() => {
      dispatch(fetchAllTask());
    });
  };

  return (
    <article className={
      props.data.completed ? 
        "Card Completed"
      :
        "Card"
    } ref={cardRef}>
      <div className="CardCheckBox">
        <input type="checkbox" defaultChecked={props.data.completed} onChange={onChangeHandler} />
      </div>
      <div className="CardInfo"
        onMouseDown={props.data.completed ? onMouseDown : undefined}
      >
        <header className="CardTitle">
          { props.data.title }
        </header>
        <section className="CardSummary">
          { props.data.task_date &&
            <>
              <i className="fas fa-calendar"></i>
              <span className={
                task_date - todayDate === 0 ?
                  "Orange"
                : task_date < todayDate ?
                  "Red"
                : 
                  ""
              }
              >{ props.data.task_date }</span>
            </>
          }
          { props.data.alarm &&
            <>
              <i className="fas fa-bell"></i>
              <span>{props.data.alarm.replace('T', ' ').substr(0, 16)}</span>
            </>
          }
        </section>
      </div>
      {/* { props.data.completed &&
        <DoubleButton action={deleteCard} color="#d9598c" 
          beforeClick={<i className="fas fa-times"></i>}
          afterClick={<i className="fas fa-trash-alt"></i>}
        />
      } */}
    </article>
  );
};

export default Card;
