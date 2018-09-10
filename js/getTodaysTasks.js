'use strict';
import {secrets} from '../secrets.js';
export function getTodaysTasks(task_date_string) {
  return new Promise((resolve, reject) => {
    $.get(`${secrets().serverUrl}/getTodaysTasks`)
    .then(tasksArray => {
      // console.log('tasksArray ', tasksArray);
      if (tasksArray) {
        resolve(tasksArray);
      }
      else {
        let err = new Error();
        reject(err);
      }
    });
  });
}