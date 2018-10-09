'use strict';
import { secrets } from '../secrets';
export function sendReport(reportObject) {
  return new Promise((resolve, reject) => {
    $.post(`${secrets().serverUrl}/report${reportObject.entry_type}`, reportObject)
    .done(result =>{ if(result) resolve(result);})
    .fail(error => reject(error));
  });
}