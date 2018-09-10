'use strict';
import { secrets } from '../secrets';
export function sendChangeRequestEmail(changeRequestObject) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${secrets().serverUrl}/changeRequest`,
      method: 'POST',
      xhrFields: {
        withCredentials: false
      },
      data: changeRequestObject,
      success: function (data) {
        console.log('Success', data);
        resolve(data);
      },
      error: function (err) {
        console.log(err);
        reject(err);
      }
    });
  });
}