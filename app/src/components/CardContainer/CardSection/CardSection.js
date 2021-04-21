import React, { useMemo } from 'react';
import propTypes from 'prop-types';
import { List } from 'immutable';
import { Card } from 'components';
import './CardSection.scss';

export const CardSection = (props) => {
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

CardSection.propTypes = {
  title: propTypes.string,
  taskList: propTypes.instanceOf(List),
  toggleModal: propTypes.func
};
