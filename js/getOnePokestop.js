// This function will just get the newest pokestop added to the database after a user submits one
// It will receive the id of the pokestop and send it in as a query in the url
'use strict';
import { secrets } from '../secrets.js';
export function getOnePokestop(pokestopId) {
  return new Promise((resolve, reject)=>{
    $.get(`${secrets().serverUrl}/getOnePokestop/${pokestopId}`)
    .then(pokestop=>{
      if(pokestop.length > 0){
        resolve(pokestop);
      }
      else {
        let err = new Error();
        reject(err);
      }
    });
  });
}
