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
      // ! className 'card' conflict with bootstrap 
      <>
        <div> 
          {this.renderCard()}
        </div> 
        {this.state.selected_card_id !== undefined ? (
          <CardModal id={this.state.selected_card_id} toggleModal={this.toggleModal} />
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

  test (a) {
    console.log(a);
  }

  toggleModal (id) {
    this.setState({
      selected_card_id: id
    });
  }

  toggleCard (event) {
    const element = event.currentTarget.parentElement.querySelector('.toggle')
    if (element.style.maxHeight) {
      element.style.maxHeight = null;
    } else {
      element.style.maxHeight = element.scrollHeight + "px";
    }
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
