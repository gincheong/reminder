import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAllTask, fetchOneTask } from 'actions';
import { CardModal, NewTaskInput } from 'components';
import { CompletedSection } from './CompletedSection/CompletedSection';
import { InProgressSection } from './InProgressSection/InProgressSection';
import './CardContainer.css';

const CardContainer = () => {
  const [selectedCard, setSelectedCard] = useState(undefined);
  const store = useSelector(store => store.taskReducer);
  const dispatch = useDispatch();

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
        <InProgressSection task={store.task_list} toggleModal={toggleModal} />
        <CompletedSection task={store.task_list} toggleModal={toggleModal} />
      </section>
      <NewTaskInput />
      { selectedCard &&
        <CardModal id={selectedCard} toggleModal={toggleModal} />
      }
    </>
  );
};

export default CardContainer;