'use strict';
import { addTask } from './addTask.js';

export function addListeners() {
  $(document).on("click", e => {
    if ($(e.target).hasClass("addTaskButton") &&
        $(`#${e.target.id}task`).val() &&
        $(`#${e.target.id}reward`).val()) {
      let taskObject = {
        requirements: $(`#${e.target.id}task`).val(),
        reward: $(`#${e.target.id}reward`).val(),
        pokestop_id: +e.target.id,
        // task_date_and_submission_time:
        // task_date_end_time:
        // the two object properties commented out above have been replaced
        // by actual mySQL time methods server-side. I left them commented
        // out just to clarify in this file that they are still being inserted
      };
      addTask(taskObject)
      .then(result => {
        console.log('result', result);
        location.reload();
      });
    }
  });
}
