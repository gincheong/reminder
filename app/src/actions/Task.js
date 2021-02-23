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
  return async dispatch => {
    // TODO : add more type
    //  dispatch(waiting)
    try {
      const response = await axios.get(`${TASK_URL}`);
      dispatch({
        type: Types.READ_ALL,
        payload: response
      });
    } catch (err) { 
      console.error(err);
    }
    // dispatch(complete)

  }
}

export function fetchOneTask (id = "") {
  return async dispatch => {
    try {
      const response = await axios.get(`${TASK_URL}${id}/`);
      dispatch({
        type: Types.READ,
        payload: response
      });
    } catch (err) {
      console.error(err);
    }
  }
}

export function addTask (data) {
  return async dispatch => {
    try {
      const response = await axios.post(`${TASK_URL}`, data);
      dispatch({
        type: Types.CREATE,
        payload: response
      });
    } catch (err) {
      console.error(err);
    }
  }
}

export function deleteTask (id) {
  return async dispatch => {
    try {
      const response = await axios.delete(`${TASK_URL}${id}/`);
      dispatch({
        type: Types.DELETE,
        payload: response
      });
    } catch (err) {
      console.error(err);
    }
  }
}

export function updateTask (id, data) {
  return async dispatch => {
    // TODO: pending일 때 스피너 추가?
    dispatch({ type: Types.UPDATE_PENDING });
    try {
      const response = await axios.put(`${TASK_URL}${id}/`, data);
      dispatch({
        type: Types.UPDATE_SUCCESS,
        payload: response
      });
    } catch (error) {
      dispatch({
        type: Types.UPDATE_FAILURE,
        payload: error
      });
    }
  }
}