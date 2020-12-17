import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchAllTask, fetchOneTask } from '../../actions';
import './Card.css';

class Card extends Component {
  constructor (props) {
    super(props);
    this.state = {
      expandedCard : 0
    }
  }

  componentDidMount () {
    // DOM이 갖춰지고 나서 실행되어야 할 초기화문을 보통 여기서 한다
    this.props.fetchAllTask();
  }

  componentDidUpdate () {
    // state나 props이 바뀌어 컴포넌트가 갱신될 때 실행될 부분
    console.log("Props", this.props);
    console.log("State", this.state)
  }

  render () {
    return (
      <div className="Card">
        {this.renderCard()}
      </div>
    );
  }

  renderCard () {
    const { taskList } = this.props.task.task;
    const { expandedCard } = this.state;
    
    return taskList.map((each, index) => {
      return (
        <div key={index} className="TaskCard" onClick={() => this.expandCard(each.id)}>
          <div className="TaskTitle">
            {each.title}
          </div>
          <div className="TaskDescription">
            {each.description}
          </div>
          {each.id === expandedCard ? (
            <div className="TaskDetail">
              {each.task_date}, {each.alarm}
            </div>
          ) : null}
        </div>
      )
    });
  }

  expandCard (id) {
    const { expandedCard } = this.state;
    if (expandedCard === id) {
      id = 0;
    }
    this.setState({
      expandedCard : id
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
    fetchAllTask: () => dispatch(fetchAllTask()),
    fetchOneTask: (id) => dispatch(fetchOneTask(id))
  }
}

Card = connect(mapStateToProps, mapDispatchToProps)(Card);

export default Card;
