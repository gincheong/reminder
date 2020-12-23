import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchAllTask } from '../../actions';
import { CardModal } from '../';
import './Card.css';

class Card extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selected_card_id: undefined
    }
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount () {
    // * DOM이 갖춰지고 나서 실행되어야 할 초기화문을 보통 여기서 한다
    this.props.fetchAllTask();
  }

  // ! Should be deleted in Distribution, function do nothing
  componentDidUpdate () {
    // * state나 props이 바뀌어 컴포넌트가 갱신될 때 실행될 부분
  }

  render () {
    return (
      // ! className 'card' conflict with bootstrap 
      <>
        <div> 
          {this.renderCard()}
        </div> 
        <CardModal id={this.state.selected_card_id} close={this.toggleModal} />
      </>
    );
  }

  renderCard () {
    const { task_list } = this.props.card.taskReducer;
    
    return task_list.map((each) => {
      return (
        <div key={each.id} className="task-card">
          <div className="task-card-header" onClick={() => this.toggleModal(each.id)}>
            <div className="task-title">
              {each.title}
            </div>
            <div className="task-description">
              {each.description}
            </div>
          </div>
        </div>
      )
    });
  }

  test (a) {
    console.log(a);
  }

  toggleModal (id) {
    this.setState({
      selected_card_id: id
    });
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
