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
            if (!each.completed) {
              return (
                <Card key={each.id} data={each} toggleModal={toggleModal} />
              );
            }
          })
        }
        { store.task_list.map((each) => {
            if (each.completed) {
              return (
                <Card key={each.id} data={each} toggleModal={toggleModal} />
              );
            }
          })
        }
      </section>
      <NewTaskInput />
      { selectedCard &&
        <CardModal id={selectedCard} toggleModal={toggleModal} />
      }
    </>
  );
};

export default CardContainer;