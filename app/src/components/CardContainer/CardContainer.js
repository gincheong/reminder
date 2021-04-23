import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllTask, fetchOneTask } from 'actions';
import { CardModal, NewTaskInput } from 'components';
import { CardSection } from './CardSection/CardSection';
import './CardContainer.scss';

const CardContainer = () => {
  const [selectedCard, setSelectedCard] = useState(undefined);
  const store = useSelector(store => store.taskReducer);
  const dispatch = useDispatch();

  const inProgressTasks = store.get('task_list').filter(each => !each.get('completed'));
  const completedTasks = store.get('task_list').filter(each => each.get('completed'));

  useEffect(() => {
    dispatch(fetchAllTask());
  }, []);

  const toggleModal = useCallback((id) => {
    dispatch(fetchOneTask(id)).then(() => {
      setSelectedCard(id);
    });
  }, []);

  return useMemo(() => (
    <>
      <section className="CardContainer">
        <CardSection title="In Progress" taskList={inProgressTasks} toggleModal={toggleModal} />
        <CardSection title="Completed" taskList={completedTasks} toggleModal={toggleModal} />
      </section>
      <NewTaskInput />
      { selectedCard &&
        <CardModal id={selectedCard} toggleModal={toggleModal} />
      }
    </>
  ), [inProgressTasks.hashCode(), completedTasks.hashCode(), selectedCard]);
};

export default CardContainer;