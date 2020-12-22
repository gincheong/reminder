import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchAllTask, fetchOneTask } from '../../actions';
import { Button } from '../';
import './Card.css';

class Card extends Component {
  componentDidMount () {
    // DOM이 갖춰지고 나서 실행되어야 할 초기화문을 보통 여기서 한다
    this.props.fetchAllTask();
  }

  componentDidUpdate () {
    // state나 props이 바뀌어 컴포넌트가 갱신될 때 실행될 부분
    console.log("Props", this.props);
    console.log("State", this.state);
  }

  render () {
    return (
      <div className="card">
        {this.renderCard()}
      </div>
    );
  }

  renderCard () {
    const { taskList } = this.props.Card.taskReducer;
    
    return taskList.map((each) => {
      const date = each.task_date.substr(0, 10);
      return (
        <div key={each.id} className="task-card">
          <div className="task-card-header" onClick={(event) => this.toggleCard(event)}>
            <div className="task-title">
              {each.title}
            </div>
            <div className="task-description">
              {each.description}
            </div>
          </div>
          {/* Toggle Content */}
          <div className="toggle">
            <hr />
            <div className="task-detail">
              <div className="task-date">
                <input className="task-datepicker" type="date" defaultValue={date} />
              </div>
              <div className="task-alarm">
                {each.alarm ? "True" : "False" }
              </div>
              <>
                <Button event={this.test} name="Edit" />
                <Button event={this.test} name="Delete" />
              </>
            </div>
          </div>
        </div>
      )
    });
  }

  test (event) {
    console.log(event);
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
    Card: state
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    fetchAllTask: () => dispatch(fetchAllTask()),
    fetchOneTask: (id) => dispatch(fetchOneTask(id))
  }
}

Card = connect(mapStateToProps, mapDispatchToProps)(Card);

export default Card;
