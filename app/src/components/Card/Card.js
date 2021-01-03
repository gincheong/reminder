import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchAllTask } from '../../actions';
import { CardModal, NewTaskInput } from '../';
import './Card.css';

class Card extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selected_card_id: undefined
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.props.fetchAllTask();
  }

  render () {
    return (
      <>
        <div className="card"> 
          {this.renderCard()}
        </div> 
        {this.state.selected_card_id !== undefined ? (
          <CardModal id={this.state.selected_card_id} toggleModal={this.toggleModal} 
            refreshList={this.props.fetchAllTask} />
        ) : undefined }
        <NewTaskInput refreshList={this.props.fetchAllTask}/>
      </>
    );
  }

  renderCard () {
    const { task_list } = this.props.card.taskReducer;
    
    return task_list.map((each) => {
      return (
        <div key={each.id} className="task-card">
          <div className="task-card-header" onClick={() => this.toggleModal(each.id)}>
            <div className="task-title">
              {each.title}
            </div>
            <div className="task-description">
              {each.description}
            </div>
          </div>
        </div>
      )
    });
  }

  toggleModal (id) {
    this.setState({
      selected_card_id: id
    });
    console.log(id);
  }

}

let mapStateToProps = (state) => {
  return {
    card: state
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    fetchAllTask: () => dispatch(fetchAllTask()),
  }
}

Card = connect(mapStateToProps, mapDispatchToProps)(Card);

export default Card;
