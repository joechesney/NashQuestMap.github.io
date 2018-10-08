'use strict';

import { secrets } from '../secrets.js';
export function addNewPokestop(newPokestopObject) {
  return new Promise((resolve, reject) => {
    $.post(`${secrets().serverUrl}/addNewPokestop`, newPokestopObject)
    .done(result => {
      if(result) resolve(result);
    })
    .fail(error => {
      console.log('error: ',error);
      reject(error);
    });
  });
}
