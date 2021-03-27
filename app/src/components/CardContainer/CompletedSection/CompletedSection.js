import React from 'react';

import { Card } from 'components';
import './CompletedSection.css';

export const CompletedSection = (props) => {
  const task = props.task.filter(each => each.completed);

  return (
    <section className="CompletedSection">
      <header className="CompletedHeader">
        Completed
      </header>
      { task.map(each =>
          <Card key={each.id} data={each} toggleModal={props.toggleModal} />
        )   
      }
    </section>
  );
}
