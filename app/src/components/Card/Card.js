import React from 'react';
import { useSelector } from 'react-redux';

import './Card.css';

const Card = (props) => {
  const store = useSelector(store => store.taskReducer);

  return store.task_list.map((each) => {
    const current = new Date();
    const todayDate = new Date(Date.UTC(current.getFullYear(), current.getMonth(), current.getDate()));
    const task_date = new Date(each.task_date);
    if (each.alarm) {
      each.alarm = each.alarm.replace('T', ' ').substr(0, 16);
    }

    return (
      <article key={each.id} className="Card" onClick={() => props.toggleModal(each.id)}>
        <header className="CardTitle">
          { each.title }
        </header>
        <section className="CardSummary">
          { each.task_date &&
            <>
              <i className="fas fa-calendar"></i>
              <span className={
                task_date - todayDate === 0 ?
                  "font-orange"
                : task_date < todayDate ?
                  "font-red"
                :
                  ""
              }
              >{ each.task_date }</span>
            </>
          }
          { each.alarm &&
            <>
              <i className="fas fa-bell"></i>
              <span>{ each.alarm }</span>
            </>
          }
        </section>
      </article>
    );  
  });
};

export default Card;