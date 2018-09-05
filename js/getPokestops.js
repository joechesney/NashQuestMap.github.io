// This file will just get the pokestops from my firebase and print them on the screen on first page load
import { secrets } from '../secrets.js';
export function getPokestops() {
  return new Promise((resolve, reject)=>{
    $.get(`${secrets.serverUrl}/getPokestops`)
    .then(pokestopsArray=>{
      if(pokestopsArray.length > 0){
        resolve(pokestopsArray);
      }
      else {
        reject(err);
      }
    });
  });
};
