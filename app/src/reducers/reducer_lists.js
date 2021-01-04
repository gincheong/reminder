import { FETCH_ALL_TASK, FETCH_ONE_TASK, ADD_TASK, DELETE_TASK, UPDATE_TASK } from '../actions';

const initialState = {
  task_list: [],
  task: {}
}

export function taskReducer(state = initialState, action) {
  // * 현재 state에서, action을 받아 다음 state를 만들어 반환함
  switch (action.type) {
    case FETCH_ALL_TASK:
      return { ...state, task_list: action.payload.data };
    case FETCH_ONE_TASK:
      return { ...state, task: action.payload.data };
    case ADD_TASK:
      // TODO: error handling
      console.log(action.payload);
      return { ...state };
    case DELETE_TASK:
      // TODO: error handling
      console.log(action.payload);
      return { ...state };
    case UPDATE_TASK:
      // TODO: error handling
      console.log(action.payload);
      return { ...state };
    default:
      return state;
  }
}