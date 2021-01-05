import { Task_Types as TYPE } from '../actions';

const initialState = {
  task_list: [],
  task: {},
  pending: null,
  error: false,
  // ! unused key
}

export function taskReducer(state = initialState, action) {
  // * 현재 state에서, action을 받아 다음 state를 만들어 반환함
  switch (action.type) {
    case TYPE.READ_ALL:
      return { ...state, task_list: action.payload.data };
    case TYPE.READ:
      return { ...state, task: action.payload.data };
    case TYPE.CREATE:
      // TODO: error handling
      console.log(action.payload);
      return { ...state };
    case TYPE.DELETE:
      // TODO: error handling
      console.log(action.payload);
      return { ...state };

    case TYPE.UPDATE_PENDING:
      return { ...state, pending: true };
    case TYPE.UPDATE_SUCCESS:
      // TODO: error handling
      return { ...state, pending: false };
    case TYPE.UPDATE_FAILURE:
      return { ...state, pending: null, error: true };
    default:
      return state;
  }
}