'use strict';
import { addTask } from './addTask.js';
import { addNewPokestop } from './addNewPokestop.js';

export function addListeners() {

  $("#add-new-pokestop-button").on("click", (e) => {
    e.preventDefault();
    let newPokeStopObject = {
      name: $(`#add-new-pokestop-name`).val(),
      latitude: +$(`#add-new-pokestop-latitude`).val(),
      longitude: +$(`#add-new-pokestop-longitude`).val(),
      // date_submitted:
      // the 'date_submitted' property is being given a value using a MySQL method server-side
    };
    addNewPokestop(newPokeStopObject)
    .then(result => {
      // the inputs are being cleared out to ideally prevent users from clicking
      // the submit button over and over, sending multiple requests before
      // the page successfully reloads
      $(`#add-new-pokestop-name`).val("");
      $(`#add-new-pokestop-latitude`).val("");
      $(`#add-new-pokestop-longitude`).val("");
      location.reload();
    });
  });

  $(document).on("click", e => {
    if (e.target.className === "addTaskButton") {
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
