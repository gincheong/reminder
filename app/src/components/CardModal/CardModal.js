import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchOneTask, deleteTask } from '../../actions';
import './CardModal.css';

class CardModal extends Component {
  constructor (props) {
    super(props);
    this.props.fetchOneTask(this.props.id);
    this.closeModalEvent = this.closeModalEvent.bind(this);
    this.deleteTaskEvent = this.deleteTaskEvent.bind(this);
    this.deleteTaskHint = this.deleteTaskHint.bind(this);
    this.modalRef = React.createRef();
  }

  render () {
    return (
      <div className="card-modal open-modal-animation" ref={this.modalRef}>
        <nav className="card-modal-header">
          <span className="card-modal-name">
            Task Description
          </span>
          <button type="button" className="card-modal-button card-modal-delete"
            onDoubleClick={this.deleteTaskEvent}>
            <i className="fas fa-trash-alt"></i>
          </button>
          <button type="button" className="card-modal-button card-modal-close"
            onClick={this.closeModalEvent}>
            <i className="fas fa-times"></i>
          </button>
        </nav>
        {this.props.id !== undefined ? this.renderModal() : undefined}
      </div>
    )
  }
  
  // ! Rendering Delayed
  renderModal () {
    const { task } = this.props.cardmodal.taskReducer;
    
    return (
      <div key={task.id} className="card-modal-content">
        <div className="card-modal-title">
          <i className="fas fa-list"></i> 
          {task.title}
        </div>
        <div className="card-modal-date">
          <i className="fas fa-calendar"></i>
          {task.task_date}
        </div>
        <div className="card-modal-alarm">
          <i className="fas fa-bell"></i>
          {task.alarm === true ? "On" : "Off"}
        </div>
        <div className="card-modal-description">
          {task.description}
        </div>
      </div>
      // ! 'alarm' icon need to be replaced
    )
  }

  closeModalEvent () {
    // ? 이게 올바른 방식인지 모르겠음
    // TODO: 모달을 슬라이드로 닫기
    this.modalRef.current.classList.add('close-modal-animation');
    setTimeout(() => {
      this.props.toggleModal(undefined);
      this.props.refreshList();
    }, 280);
  }

  deleteTaskEvent () {
    this.props.deleteTask(this.props.id);
    this.closeModalEvent();
  }

}

let mapStateToProps = (state) => {
  return {
    cardmodal: state
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    fetchOneTask: (id) => dispatch(fetchOneTask(id)),
    deleteTask: (id) => dispatch(deleteTask(id))
  }
}

CardModal = connect(mapStateToProps, mapDispatchToProps)(CardModal);

export default CardModal;