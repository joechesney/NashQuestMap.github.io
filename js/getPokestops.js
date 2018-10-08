// This file will get all the pokestops from my database and print them on the screen on first page load
'use strict';
import { secrets } from '../secrets.js';
export function getPokestops() {
  return new Promise((resolve, reject)=>{
    $.get(`${secrets().serverUrl}/getPokestops`)
    .done(pokestopsArray => {if(pokestopsArray.length > 0) resolve(pokestopsArray);})
    .fail(err => reject(err));
  });
}
