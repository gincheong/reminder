import { FETCH_TASK } from '../actions';

const initialState = {
  taskList: [],
}

export function taskReducer(state = initialState, action) {
  // 현재 state에서, action을 받아 다음 state를 만들어 반환함
  switch (action.type) {
    case FETCH_TASK:
      return { ...state, taskList: action.payload.data };
    default:
      return state;
  }
}