import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addTask } from '../../actions';
import './NewTaskInput.css';

class NewTaskInput extends Component {
  constructor (props) {
    super(props);
    this.inputRef = React.createRef();
    this.addTaskToServer = this.addTaskToServer.bind(this);
    this.onKeyPressEvent = this.onKeyPressEvent.bind(this);
  }

  render () {
    return ( 
      <div className="new-task">
        <div className="new-task-button" onClick={this.addTaskToServer}>
          <i className="fas fa-plus"></i>
        </div>
        <input type="text" className="new-task-input"
          placeholder="add new task"
          onKeyPress={this.onKeyPressEvent}
          ref={this.inputRef} />
      </div>
    )
  }

  onKeyPressEvent (event) {
    if (event.key === 'Enter') {
      this.addTaskToServer();
    }
  }

  addTaskToServer () {
    const inputElement = this.inputRef.current;
    const title = inputElement.value.trim();
    if (title !== "") {
      const data = {
        title: title,
      }
      inputElement.value = "";
      
      // ? 이 부분이 순서대로 작동 못 하는 경우?
      this.props.addTask(data);
      this.props.refreshList();
    } else {
      // TODO : delete this line, or add any alert message
      console.warn('must input valid value');
    }
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    addTask: (data) => dispatch(addTask(data)),
  }
}

NewTaskInput = connect(undefined, mapDispatchToProps)(NewTaskInput);

export default NewTaskInput;
