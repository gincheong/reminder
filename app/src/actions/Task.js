import axios from 'axios';

import { TASK_URL } from './API_URL';

export const Types = {
  READ_ALL: 'task/READ_ALL',
  READ: 'task/READ',
  CREATE: 'task/CREATE',
  DELETE: 'task/DELETE',
  UPDATE_PENDING: 'task/UPDATE_PENDING',
  UPDATE_SUCCESS: 'task/UPDATE_SUCCESS',
  UPDATE_FAILURE: 'task/UPDATE_FAILRUE',
};

export function fetchAllTask () {
  return dispatch => {
    // TODO : add more type
    //  dispatch(waiting)
    axios.get(TASK_URL)
      .then(response => {
        dispatch({
          type: Types.READ_ALL,
          payload: response
        })
      }
      //.catch
    )
    // dispatch(complete)

  }
}

export function fetchOneTask (id = "") {
  return dispatch => {
    axios.get(TASK_URL + id + '/')
      .then(response => {
        dispatch({
          type: Types.READ,
          payload: response
        })
      }
    )
  }
}

export function addTask (data) {
  return dispatch => {
    axios.post(TASK_URL, data)
      .then(response => {
        dispatch({
          type: Types.CREATE,
          payload: response
        })
      }
    )
  }
}

export function deleteTask (id) {
  return dispatch => {
    axios.delete(TASK_URL + id)
      .then(response => {
        dispatch({
          type: Types.DELETE,
          payload: response
        })
      }
    )
  }
}

export function updateTask (id, data) {
  return dispatch => {
    // ! unused
    dispatch({
      type: Types.UPDATE_PENDING
    });
    const promise = axios.put(TASK_URL + id + '/', data);
    promise.then(response => {
      dispatch({
        type: Types.UPDATE_SUCCESS,
        payload: response
      })
    })
    .catch(error => {
      dispatch({
        type: Types.UPDATE_FAILURE,
        payload: error
      })
    })
    return promise;
  }
}