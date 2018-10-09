'use strict';
import { secrets } from '../secrets';
export function sendChangeRequestEmail(changeRequestObject) {
  return new Promise((resolve, reject) => {
    $.post(`${secrets().serverUrl}/changeRequest`, changeRequestObject)
    .done(result =>{ if(result) resolve(result);})
    .fail(error => reject(error));
  });
}