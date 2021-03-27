import React from 'react';

import { Card } from 'components';
import './InProgressSection.css';

export const InProgressSection = (props) => {
  const task = props.task.filter(each => !each.completed);

  return (
    <section className="InProgressSection">
      <header className="InProgressHeader">
        In Progress
      </header>
      { task.map(each => 
          <Card key={each.id} data={each} toggleModal={props.toggleModal} />
        )
      }
    </section>
  );
}
