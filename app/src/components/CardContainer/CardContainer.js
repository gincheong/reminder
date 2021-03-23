import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { fetchAllTask, fetchOneTask } from 'actions';
import { CardModal, NewTaskInput, Card } from 'components';
import './CardContainer.css';

const CardContainer = () => {
  const [selectedCard, setSelectedCard] = useState(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllTask());
    // eslint-disable-next-line
  }, []);

  const toggleModal = (id) => {
    console.log(id);
    dispatch(fetchOneTask(id)).then(() => {
      setSelectedCard(id);
    });
  };

  return (
    <>
      <section className="CardContainer">
        <Card toggleModal={toggleModal} />
      </section>
      <NewTaskInput refreshList={fetchAllTask} />
      { selectedCard &&
        <CardModal id={selectedCard} toggleModal={toggleModal} refreshList={fetchAllTask} />
      }
    </>
  );
};

export default CardContainer;