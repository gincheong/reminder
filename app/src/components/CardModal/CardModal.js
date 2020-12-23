import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchOneTask } from '../../actions';
import './CardModal.css';

class CardModal extends Component {
  componentDidUpdate (prevProps) {
    if (this.props.id !== prevProps.id) {
      this.props.fetchOneTask(this.props.id);
    }
  }

  render () {
    if (this.props.id === undefined) {
      return '';
    }
    return (
      <div className="card-modal">
        <div className="card-modal-header">
          <button type="button" onClick={() => this.props.close(undefined)}>DEBUG</button>
        </div>
        {this.props.id !== undefined ? this.renderModal() : undefined}
      </div>
    )
  }

  renderModal () {
    const { task } = this.props.cardmodal.taskReducer;
    console.log(task);
    return (
      <div key={task.id} className="card-modal">
        <div className="card-modal-title">
          Task : {task.title}
        </div>
        <div className="card-modal-date">
          Date : {task.task_date}
        </div>
        <div className="card-modal-alarm">
          Alarm : {task.alarm === true ? "On" : "Off"}
        </div>
        <div className="card-modal-description">
          Description : {task.description}
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    cardmodal: state
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    fetchOneTask: (id) => dispatch(fetchOneTask(id))
  }
}

CardModal = connect(mapStateToProps, mapDispatchToProps)(CardModal);

export default CardModal;