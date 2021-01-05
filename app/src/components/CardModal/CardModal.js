import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchOneTask, deleteTask, updateTask } from '../../actions';
import { Tooltip, Input, Textarea } from '../../components';
import './CardModal.css';

class CardModal extends Component {
  constructor (props) {
    super(props);
    this.state = {
      task: {}
    };

    this.props.fetchOneTask(this.props.id);
    
    this.saveTaskEvent = this.saveTaskEvent.bind(this);
    this.deleteTaskEvent = this.deleteTaskEvent.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeModalEvent = this.closeModalEvent.bind(this);

    this.modalRef = React.createRef();
    this.titleRef = React.createRef();
    this.task_dateRef = React.createRef();
    this.alarmRef = React.createRef();
    this.descriptionRef = React.createRef();
    // TODO : Ref 각각 만들어서, Save시에 각 value 불러오기
  }

  shouldComponentUpdate (nextProps) {
    const prev = this.props.cardmodal.taskReducer.task;
    const next = nextProps.cardmodal.taskReducer.task;
    if (prev !== next) {
      this.setState({
        task: next,
      });
    }
    return true; 
  }

  componentDidMount () {
    this.closeModalEvent();
  }

  render () {
    return (
      <div className="card-modal open-modal-animation" ref={this.modalRef}>
        <div className="card-modal-header">
          <span className="card-modal-name">
            Task Description
          </span>
        </div>
        {this.props.id !== undefined ? this.renderModal() : undefined}

        <div className="card-modal-footer">
          <button type="button" className="card-modal-button card-modal-save"
            onClick={this.saveTaskEvent}>
            <i className="fas fa-save"></i>
          </button>
          <Tooltip message="Double Click">
            <button type="button" className="card-modal-button card-modal-delete"
              onDoubleClick={this.deleteTaskEvent}>
              <i className="fas fa-trash-alt"></i>
            </button>
          </Tooltip>
          <button type="button" className="card-modal-button card-modal-close"
            onClick={this.closeModal}>
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>
    )
  }
   
  // ! Rendering Delayed
  renderModal () {
    const { task } = this.state;
    var { task_date } = task; 
    if (task_date) {
      task_date = task_date.substr(0, 10);
    } else {
      task_date = undefined;
    }
    
    return (
      <div key={task.id} className="card-modal-content">
        <div className="card-modal-title">
          <i className="fas fa-list"></i>
          <Input type="text" value={task.title} name="title" ref={this.titleRef} clearButton notNull
                 placeholder="Title Must be Filled" />
        </div>
        <div className="card-modal-date">
          <i className="fas fa-calendar"></i>
          <Input type="date" value={task_date} name="task_date" ref={this.task_dateRef} clearButton />
        </div>
        <div className="card-modal-alarm">
          <i className="fas fa-bell"></i>
          <Input type="datetime-local" value={task.alarm} name="alarm" ref={this.alarmRef} clearButton />
        </div>
        <div className="card-modal-description">
          <i className="fas fa-ellipsis-v"></i>
          <Textarea value={task.description} rows='10' ref={this.descriptionRef} />
          {/* // TODO: 이벤트 동일하게 적용하기, 크기조절 없애기, 스크롤 자동으로 늘어나게 하기 */}
        </div>
      </div>
    )
  }

  saveTaskEvent () {
    // TODO: Action 만들기
    const title = this.titleRef.current.state.value;
    if (!title) {
      return;
    }

    const task_date = this.task_dateRef.current.state.value;
    const alarm = this.alarmRef.current.state.value;
    const description = this.descriptionRef.current.state.value;

    const data = new FormData();
    data.append('title', title);
    data.append('task_date', task_date);
    data.append('alarm', alarm);
    data.append('description', description);

    this.props.updateTask(this.props.id, data).then(() => {
      this.closeModal();
    });
  }

  deleteTaskEvent () {
    this.props.deleteTask(this.props.id).then(() => {
      this.closeModal();
    });
  }

  closeModal () {
    this.modalRef.current.classList.add('close-modal-animation');
  }

  closeModalEvent () {
    const element = this.modalRef.current;
    element.addEventListener('animationend', (event) => {
      if (event.animationName === 'close-modal') {
        this.props.toggleModal(undefined);
        this.props.refreshList();
      }
    });
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
    deleteTask: (id) => dispatch(deleteTask(id)),
    updateTask: (id, data) => dispatch(updateTask(id, data)),
  }
}

CardModal = connect(mapStateToProps, mapDispatchToProps)(CardModal);

export default CardModal;