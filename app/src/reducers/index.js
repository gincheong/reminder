import { combineReducers } from 'redux';
import { taskReducer } from './reducer_lists';

const rootReducer = combineReducers({
  // 여러 개의 리듀서를 하나로 통합해서 사용할 수 있음
  taskReducer
});

export default rootReducer;
