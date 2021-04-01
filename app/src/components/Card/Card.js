import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';

import { deleteTask, fetchAllTask, updateTask } from 'actions';
import './Card.scss';

const Card = (props) => {
  const dispatch = useDispatch();
  const cardRef = useRef();
  const backgroundRef = useRef();
  
  const current = new Date();
  const todayDate = new Date(Date.UTC(current.getFullYear(), current.getMonth(), current.getDate()));
  const task_date = new Date(props.data.task_date);

  const baseColor = 46;
  // Card Drag Event
  const onMouseDown = (event) => {
    const dragRatio = 4; // 카드의 1/4 만큼 드래그하면 기능 작동
    const startX = event.clientX;
    
    // 드래그에 따라 element 이동시킴
    const onMouseMove = (event) => {
      // 드래그 시, 항목이 일정 이상 움직이지 않게 함
      const moveDistance = event.clientX - startX;
      if (Math.abs(moveDistance) <= parseInt(cardRef.current.offsetWidth / dragRatio)) {
        cardRef.current.style.left = event.clientX - startX + 'px';
        if (moveDistance > 0) {
          // something to be added?
        } else {
          const [r, g, b] = [
            baseColor + Math.abs(moveDistance) * 0.9,
            baseColor + Math.abs(moveDistance) * 0.1,
            baseColor + Math.abs(moveDistance) * 0.1,
          ];
          backgroundRef.current.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        }
      }
    };

    const onMouseUp = (event) => {
      // 이벤트 중복등록 방지
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      
      // 제자리 클릭 시 Modal 활성화
      if (event.clientX === startX) {
        props.toggleModal(props.data.id);
      }

      const moveDistance = event.clientX - startX;
      if (cardRef.current.offsetWidth / dragRatio < Math.abs(moveDistance)) {
        if (moveDistance > 0) {
          // left to right
          toggleCompleted();
        } else {
          // right to left
          dragAnimation(deleteCard);
        }
      } else {
        cardRef.current.style.left = 0;
      }
    };

    // 마우스가 element를 벗어나는 경우를 위해 document에 이벤트리스너 등록
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const dragAnimation = (callback) => {
    const dragValue = 50;

    if (Math.abs(parseInt(cardRef.current.style.left)) < cardRef.current.offsetWidth) {
      // ?: 이렇게 고정 숫자로 이동시키는게 맞나
      cardRef.current.style.left = parseInt(cardRef.current.style.left) - dragValue + 'px';
      requestAnimationFrame(() => { dragAnimation(callback) });
    } else {
      callback();
    }
  };

  const toggleCompleted = () => {
    let completed = !cardRef.current.classList.contains('Completed');
    
    const data = new FormData();
    data.append('title', props.data.title);
    data.append('completed', completed);
    dispatch(updateTask(props.data.id, data)).then(() => {
      dispatch(fetchAllTask());
    });
  };

  const deleteCard = () => {
    dispatch(deleteTask(props.data.id)).then(() => {
      dispatch(fetchAllTask());
    });
  };

  return (
    <article className="Card">
      <div className="Background" ref={backgroundRef}>
      </div>
      <div className={"CardContent" + (props.data.completed ? " Completed" : '')} ref={cardRef}>
        <div className="CardInfo" onMouseDown={onMouseDown}>
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
      </div>
    </article>
  );
};

export default Card;
