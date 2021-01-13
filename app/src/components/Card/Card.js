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
    const tempDate = new Date();
    const todayDate = new Date(Date.UTC(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate()));
    return task_list.map((each) => {
      if (each.alarm) {
        each.alarm = each.alarm.replace('T', ' ').substr(0, 16);
      }
      const task_date = new Date(each.task_date);
      
      return (
        <div key={each.id} className="task-card">
          <div className="task-card-header" onClick={() => this.toggleModal(each.id)}>
            <div className="task-title">
              {each.title}
            </div>
            <div className="task-summary">
              {
                !each.task_date
                ? undefined
                : (task_date < todayDate
                  ? ( <><i className="fas fa-calendar"></i><span className="font-red">{each.task_date}</span></> )
                  : ( <><i className="fas fa-calendar"></i><span>{each.task_date}</span></> )
                )
              }
              {each.alarm ? (
                <><i className="fas fa-bell"></i><span>{each.alarm}</span></>)
                : undefined}
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
