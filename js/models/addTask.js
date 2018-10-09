'use strict';
import { secrets } from '../secrets.js';
export function addTask(taskObject) {
  return new Promise((resolve, reject) => {
    $.post(`${secrets().serverUrl}/addTask/${taskObject.pokestop_id}`, taskObject)
    .done(result => {
      if(result) resolve(result);
    })
    .fail(error => {
      console.log('error: ',error);
      reject(error);
    });
  });
}
