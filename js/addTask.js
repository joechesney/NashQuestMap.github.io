'use strict';
import { secrets } from '../secrets.js';
export function addTask(taskObject) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${secrets().serverUrl}/addTask/${taskObject.pokestop_id}`,
      method: 'POST',
      xhrFields: {
        withCredentials: false
      },
      data: taskObject,
      success: function (data) {
        console.log('Success', data);
        resolve(data);
      },
      error: function (err) {
        console.log('We are sorry but our servers are having an issue right now');
        reject(err);
      }
    });
  });
}
