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
      alert("That pokestop is outside of the allowed submission area. This page will be reloaded in 2 seconds.");
      window.setTimeout(() => {
        location.reload();
      }, 2000);
      reject(error);
    });
  });
}
