import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAllTask, fetchOneTask } from 'actions';
import { CardModal, NewTaskInput } from 'components';
import './Card.css';

const Card = () => {
  const [selectedCardId, setSelectedCardId] = useState(undefined);
  const store = useSelector(store => store.taskReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllTask());
    // ? : dispatch에 대한 dependency가 useEffect에 추가되지 않아서 경고메시지 있음
    // eslint-disable-next-line
  }, []);

  const renderCard = () => {
    const task_list = store.task_list;
    const tempDate = new Date();
    const todayDate = new Date(Date.UTC(tempDate.getFullYear(), tempDate.getMonth(),
                              tempDate.getDate()));

    return task_list.map(each => {
      if (each.alarm) {
        each.alarm = each.alarm.replace('T', '').substr(0, 16);
      }
      const task_date = new Date(each.task_date);

      return (
        <article key={each.id} className="task-card">
          <div className="task-card-header" onClick={() => toggleModal(each.id)}>
            <div className="task-title">
              {each.title}
            </div>
            <div className="task-summary">
              { !each.task_date ? undefined
                : (
                  <>
                    <i className="fas fa-calendar"></i>
                    { task_date < todayDate ? (
                      <span className="font-red">{each.task_date}</span>
                      ) : (
                      <span>{each.task_date}</span>
                      )
                    }
                  </>
                )
              }
            </div>
          </div>
        </article>
      );
    });
  };

  const toggleModal = (id) => {
    dispatch(fetchOneTask(id)).then(() => {
      setSelectedCardId(id);
    });
  };

  return (
    <>
      <section className="card">
        {renderCard()}
      </section>
      {selectedCardId !== undefined ? (
        <CardModal id={selectedCardId} toggleModal={toggleModal}
          refreshList={fetchAllTask}
        />
      ) : undefined }
      <NewTaskInput refreshList={fetchAllTask} />
    </>
  );

}

export default Card;
