import React from 'react';

import { Card } from 'components';
import './CardSection.scss';

export const CardSection = (props) => {
  return (
    <section className="CardSection">
      <header className="CardSectionHeader">
        {props.title} ({props.task.length})
      </header>
      { props.task.map(each => 
          <Card key={each.id} data={each} toggleModal={props.toggleModal} />
        )
      }
    </section>
  );
}
