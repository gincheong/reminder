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
      
      // ! 비동기처리 필요함
      this.props.addTask(data).then(() => {
        this.props.refreshList();
      });
    } else {
      inputElement.value = "";
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
