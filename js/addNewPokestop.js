'use strict';

import { secrets } from '../secrets.js';
export function addNewPokestop(newPokestopObject) {
  console.log('newPokestopObject', newPokestopObject);
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${secrets().serverUrl}/addNewPokestop`,
      method: 'POST',
      xhrFields: {
        withCredentials: false
      },
      // headers: {
      // },
      data: newPokestopObject,
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
