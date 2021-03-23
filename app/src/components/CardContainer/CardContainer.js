import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAllTask, fetchOneTask } from 'actions';
import { CardModal, NewTaskInput, Card } from 'components';
import './CardContainer.css';

const CardContainer = () => {
  const [selectedCard, setSelectedCard] = useState(undefined);
  const store = useSelector(store => store.taskReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllTask());
    // eslint-disable-next-line
  }, []);

  const toggleModal = (id) => {
    dispatch(fetchOneTask(id)).then(() => {
      setSelectedCard(id);
    });
  };

  return (
    <>
      <section className="CardContainer">
        { store.task_list.map((each) => {
            return (
              <Card key={each.id} data={each} toggleModal={toggleModal} />
            );
          })
        }
      </section>
      <NewTaskInput refreshList={fetchAllTask} />
      { selectedCard &&
        <CardModal id={selectedCard} toggleModal={toggleModal} refreshList={fetchAllTask} />
      }
    </>
  );
};

export default CardContainer;