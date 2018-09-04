
import {serverUrl} from './serverUrl.js';
export function getTodaysTasks(task_date_string) {
  return new Promise((resolve, reject) => {
    $.get(`${serverUrl()}/getTodaysTasks`)
    .then(tasksArray => {
      // console.log('tasksArray ', tasksArray);
      if (tasksArray) {
        resolve(tasksArray);
      }
      else {
        reject(err);
      }
    });
  });
};