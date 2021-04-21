import React, { useEffect, useMemo, useRef } from 'react';
import { List } from 'immutable';
import { Card } from 'components';
import './CardSection.scss';

export const CardSection = (props) => {
  const prevTaskList = useRef(List());
  
  useEffect(() => {
    prevTaskList.current = props.taskList;
  }, [props.taskList]);
  const equalPrevTaskList = prevTaskList.current.equals(props.taskList);

  return useMemo(() => (
    <section className="CardSection">
      <header className="CardSectionHeader">
        {props.title} ({props.taskList.size})
      </header>
      { props.taskList.map(each => 
          <Card key={each.get('id')} data={each} toggleModal={props.toggleModal} />
        )
      }
    </section>
  ), [props.taskList.hashCode()]);
}
