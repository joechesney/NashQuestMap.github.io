'use strict';

import { secrets } from '../secrets.js';
export function addNewPokestop(newPokestopObject) {
  return new Promise((resolve, reject) => {
    $.post(`${secrets().serverUrl}/addNewPokestop`, newPokestopObject
    ).then(result => {
      if(result) resolve(result);
      else reject(result);
    });
  });
}
