// This function will just get the newest pokestop added to the database after a user submits one
// It will receive the id of the pokestop and send it in as a query in the url
'use strict';
import { secrets } from '../secrets.js';
export function getOnePokestop(pokestopId) {
  return new Promise((resolve, reject)=>{
    $.get(`${secrets().serverUrl}/getOnePokestop/${pokestopId}`)
    .done(result => {if(result) resolve(result);})
    .fail(error => reject(error));
  });
}
