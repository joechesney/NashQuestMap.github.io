'use strict';

import { secrets } from '../secrets.js';
export function addNewPokestop(newPokestopObject) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${secrets().serverUrl}/addNewPokestop`,
      method: 'POST',
      xhrFields: {
        withCredentials: false
      },
      data: newPokestopObject,
      success: function (data) {
        resolve(data);
      },
      error: function (err) {
        console.log(err);
        reject(err);
      }
    });
  });
}
