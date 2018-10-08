'use strict';
import { secrets } from '../secrets.js';

export function rewardSearch(query) {
  return new Promise((resolve, reject) => {
    $.get(`${secrets().serverUrl}/rewardSearch/?task_reward=${query}`)
    .done(result =>{ if(result) resolve(result);})
    .fail(error => reject(error));
  });
}
