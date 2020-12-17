import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchTask } from '../../actions';
import './Card.css';

class Card extends Component {
  componentDidMount () {
    // DOM이 갖춰지고 나서 실행되어야 할 초기화문을 보통 여기서 한다
    this.props.fetchTask();
  }

  componentDidUpdate () {
    // state나 props이 바뀌어 컴포넌트가 갱신될 때 실행될 부분
  }

  render () {
    return (
      <div className="Card">
        <button type="button" onClick={ this.props.fetchTask }>
          refresh
        </button>
        {this.renderCard()}
      </div>
    );
  }

  renderCard () {
    const { taskList } = this.props.task.task;
    console.log(taskList);
    return taskList.map(each => {
      return (
        <div key={each.id} className="TaskCard">
          <div className="TaskTitle">
            {each.title}
          </div>
          <div className="TaskDescription">
            {each.description}
          </div>
        </div>
      )
    });
  }

}

let mapStateToProps = (state) => {
  return {
    task: state
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    fetchTask: () => dispatch(fetchTask())
  }
}

Card = connect(mapStateToProps, mapDispatchToProps)(Card);

export default Card;
