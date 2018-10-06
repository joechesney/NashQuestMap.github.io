'use strict';
import { secrets } from '../secrets.js';

export function rewardSearch(query) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${secrets().serverUrl}/rewardSearch/?task_reward=${query}`,
      method: 'GET',
      xhrFields: {
        withCredentials: false
      },
      success: function (data) {
        resolve(data);
      },
      error: function (err) {
        console.log(err);
        reject(err);
      }
    });
  });
}
