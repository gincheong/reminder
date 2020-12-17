import axios from 'axios';

import { TASK_URL } from './API_URL';

export const FETCH_TASK = 'FETCH_TASK';

export function fetchTask () {
  return dispatch => {
    axios.get(TASK_URL)
      .then(response => {
        dispatch({
          type: FETCH_TASK,
          payload: response
        })
      }
      //.catch
    )

  }
}