import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAllTask, fetchOneTask } from 'actions';
import { CardModal, NewTaskInput } from 'components';
import { CardSection } from './CardSection/CardSection';
import './CardContainer.css';

const CardContainer = () => {
  const [selectedCard, setSelectedCard] = useState(undefined);
  const store = useSelector(store => store.taskReducer);
  const dispatch = useDispatch();

  const inProgressTasks = store.task_list.filter(each => !each.completed);
  const completedTasks = store.task_list.filter(each => each.completed);

  useEffect(() => {
    dispatch(fetchAllTask());
  }, []);

  const toggleModal = (id) => {
    dispatch(fetchOneTask(id)).then(() => {
      setSelectedCard(id);
    });
  };

  return (
    <>
      <section className="CardContainer">
        <CardSection title="In Progress" task={inProgressTasks} toggleModal={toggleModal} />
        <CardSection title="Completed" task={completedTasks} toggleModal={toggleModal} />
      </section>
      <NewTaskInput />
      { selectedCard &&
        <CardModal id={selectedCard} toggleModal={toggleModal} />
      }
    </>
  );
};

export default CardContainer;