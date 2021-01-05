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
    return axios.get(TASK_URL)
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
    return axios.get(TASK_URL + id + '/')
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
    return axios.post(TASK_URL, data)
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
    return axios.delete(TASK_URL + id)
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
    // TODO: pending일 때 스피너 추가?
    dispatch({ type: Types.UPDATE_PENDING });
    return axios.put(TASK_URL + id + '/', data)
    .then(response => {
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
  }
}