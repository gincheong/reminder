import { TASK_TYPES } from 'actions';
import { taskReducer } from 'reducers/taskReducer';

describe('taskReducer', () => {
  let state = taskReducer(undefined, {});

  it ('default state', () => {
    expect(state).toHaveProperty('task_list', []);
  });

  it('fetchAllTask', () => {
    state = taskReducer(state, {
      type: TASK_TYPES.READ_ALL,
      payload: { data: [1, 2] },
    });
    expect(state).toHaveProperty('task_list', [1, 2]);
  });

  it('fetchOneTask', () => {
    state = taskReducer(state, {
      type: TASK_TYPES.READ,
      payload: { data: { 'id': '1' } },
    });
    expect(state).toHaveProperty('task', { 'id': '1' });
  });
});
