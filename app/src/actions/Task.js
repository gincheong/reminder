import axios from 'axios';

import { TASK_URL } from './API_URL';

export const FETCH_ALL_TASK = 'FETCH_ALL_TASK';
export const FETCH_ONE_TASK = 'FETCH_ONE_TASK';

export function fetchAllTask () {
  return dispatch => {
    // dispatch(waiting)
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
    axios.get(TASK_URL + id)
      .then(response => {
        dispatch({
          type: FETCH_ONE_TASK,
          payload: response
        })
      }
    )
  }
}