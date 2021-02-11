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
        <section className="card"> 
          {this.renderCard()}
        </section> 
        {this.state.selected_card_id !== undefined ? (
          <CardModal id={this.state.selected_card_id} toggleModal={this.toggleModal} 
            refreshList={this.props.fetchAllTask} />
        ) : undefined }
        <NewTaskInput refreshList={this.props.fetchAllTask}/>
      </>
    );
  }

  renderCard () {
    const task_list = this.props.task_list;
    const tempDate = new Date();
    const todayDate = new Date(Date.UTC(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate()));
    return task_list.map((each) => {
      if (each.alarm) {
        each.alarm = each.alarm.replace('T', ' ').substr(0, 16);
      }
      const task_date = new Date(each.task_date);
      
      return (
        <article key={each.id} className="task-card">
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
        </article>
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
    task_list: state.taskReducer.task_list
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    fetchAllTask: () => dispatch(fetchAllTask()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);;
