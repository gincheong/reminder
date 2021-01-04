import axios from 'axios';

import { TASK_URL } from './API_URL';

export const FETCH_ALL_TASK = 'FETCH_ALL_TASK';
export const FETCH_ONE_TASK = 'FETCH_ONE_TASK';
export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';

export function fetchAllTask () {
  return dispatch => {
    // TODO : add more type
    //  dispatch(waiting)
    axios.get(TASK_URL)
      .then(response => {
        dispatch({
          type: FETCH_ALL_TASK,
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
          type: FETCH_ONE_TASK,
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
          type: ADD_TASK,
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
          type: DELETE_TASK,
          payload: response
        })
      }
    )
  }
}

export function updateTask (id, data) {
  return dispatch => {
    axios.put(TASK_URL + id + '/', data)
      .then(response => {
        dispatch({
          type: UPDATE_TASK,
          payload: response
        })
      }
    )
  }
}