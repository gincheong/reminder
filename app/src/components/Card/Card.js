import React, { useMemo, useRef } from 'react';
import propTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { deleteTask, fetchAllTask, updateTask } from 'actions';
import './Card.scss';

const Card = (props) => {
  const dispatch = useDispatch();
  const cardRef = useRef();
  const backgroundRef = useRef();
  
  const current = new Date();
  const todayDate = new Date(
    Date.UTC(current.getFullYear(), current.getMonth(), current.getDate())
  );
  const task_date = new Date(props.data.get('task_date'));

  // ?: useMemo를 굳이 사용할 필요가 없는 부분? 괜한 메모리 낭비
  const baseColor = useMemo(() => 46, []);
  const dragDistance = useMemo(() => 100, []); // 동작 활성화시키는 최소 드래그 길이 (px)
  const dragValue = useMemo(() => 50, []); // 삭제 동작 시에, 자동으로 드래그될 속도 (px)
  
  // Card Drag Event
  const onMouseDown = (event) => {
    let startX;
    if (event.type === 'touchstart') {
      startX = event.touches[0].clientX;
    } else {
      startX = event.clientX;
    }
    
    // 드래그에 따라 element 이동시킴
    let lastTouchClientX; // touchend에서 clientX 가져올 수 없음
    const onMouseMove = (event) => {
      // 드래그 시, 항목이 일정 이상 움직이지 않게 함
      let clientX;
      if (event.type === 'touchmove') {
        clientX = event.touches[0].clientX;
      } else {
        clientX = event.clientX;
      }
      lastTouchClientX = clientX;
      
      const moveDistance = clientX - startX;
      if (Math.abs(moveDistance) <= dragDistance) {
        cardRef.current.style.left = clientX - startX + 'px';
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

      document.removeEventListener('touchmove', onMouseMove);
      document.removeEventListener('touchend', onMouseUp);
      
      // 제자리 클릭 시 Modal 활성화
      let clientX;
      if (event.type === 'touchend') {
        clientX = lastTouchClientX;
      } else {
        clientX = event.clientX;
      }

      if (clientX === startX) {
        props.toggleModal(props.data.get('id'));
      }

      const moveDistance = clientX - startX;
      if (dragDistance < Math.abs(moveDistance)) {
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

    document.addEventListener('touchmove', onMouseMove);
    document.addEventListener('touchend', onMouseUp);
  };

  const dragAnimation = (callback) => {
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
    data.append('title', props.data.get('title'));
    data.append('completed', completed);
    dispatch(updateTask(props.data.get('id'), data)).then(() => {
      dispatch(fetchAllTask());
    });
  };

  const deleteCard = () => {
    dispatch(deleteTask(props.data.get('id'))).then(() => {
      dispatch(fetchAllTask());
    });
  };

  return (
    <article className="Card">
      <div className="Background" ref={backgroundRef}>
      </div>
      <div className={"CardContent" + (props.data.get('completed') ? " Completed" : '')} ref={cardRef}>
        <div className="CardInfo" onMouseDown={onMouseDown} onTouchStart={onMouseDown}>
          <header className="CardTitle">
            { props.data.get('title') }
          </header>
          <section className="CardSummary">
            { props.data.get('task_date') &&
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
                >{ props.data.get('task_date') }</span>
              </>
            }
            { props.data.get('alarm') &&
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

Card.propTypes = {
  data: propTypes.shape({
    id: propTypes.number,
    created_at: propTypes.string, // YYYY-MM-SST00:00:00.000000
    updated_at: propTypes.string, // YYYY-MM-SST00:00:00.000000
    title: propTypes.string,
    description: propTypes.string,
    task_date: propTypes.string | null, // YYYY-MM-DD
    alarm: propTypes.string | null, // YYYY-MM-DDThh:mm:ss
    completed: propTypes.bool
  }),
  toggleModal: propTypes.func
};