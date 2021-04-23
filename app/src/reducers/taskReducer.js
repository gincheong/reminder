import { Map, List } from 'immutable';
import { TASK_TYPES as TYPE } from '../actions';

const initialState = Map({
  task_list: List([
    // {
    //   id: 1,
    //   created_at: "YYYY-MM-SST00:00:00.000000",
    //   updated_at: "YYYY-MM-SST00:00:00.000000",
    //   title: "task name",
    //   description: "description about task",
    //   task_date: "YYYY-MM-DD",
    //   alarm: "YYYY-MM-DDThh:mm:ss" | null,
    //   completed: true
    // }
  ]),
  task: Map({}),
  pending: null,
  error: false // TODO: 에러 핸들링 필요
});

export function taskReducer(state = initialState, action) {
  switch (action.type) {
    case TYPE.READ_ALL:
      return state
        .set('task_list', List(action.payload.data.map(each => Map(each))));
    case TYPE.READ:
      return state
        .set('task', Map(action.payload.data));
    case TYPE.CREATE:
      return state;
    case TYPE.DELETE:
      return state;

    case TYPE.UPDATE_PENDING:
      return state.set('pending', true);
    case TYPE.UPDATE_SUCCESS:
      return state
        .set('pending', false)
        .set('error', false);
    case TYPE.UPDATE_FAILURE:
      return state
        .set('pending', null)
        .set('error', true);
    default:
      return state;
  }
}