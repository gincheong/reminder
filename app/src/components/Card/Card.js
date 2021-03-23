import React from 'react';

import './Card.css';

const Card = (props) => {
  const current = new Date();
  const todayDate = new Date(Date.UTC(current.getFullYear(), current.getMonth(), current.getDate()));
  const task_date = new Date(props.data.task_date);

  const onChangeHandler = (event) => {
    console.log(event.target);
  };

  return (
    <article className="Card">
      <div className="CardCheckBox">
        <input type="checkbox" defaultChecked={ props.data.completed } onChange={ onChangeHandler } />
      </div>
      <div className="CardInfo" onClick={() => props.toggleModal(props.data.id)}>
        <header className="CardTitle">
          { props.data.title }
        </header>
        <section className="CardSummary">
          { props.data.task_date &&
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
              >{ props.data.task_date }</span>
            </>
          }
          { props.data.alarm &&
            <>
              <i className="fas fa-bell"></i>
              <span>{ props.data.alarm.replace('T', ' ').substr(0, 16) }</span>
            </>
          }
        </section>
      </div>
    </article>
  );
};

export default Card;
