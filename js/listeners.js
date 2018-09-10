'use strict';
import { addTask } from './addTask.js';
import { addNewPokestop } from './addNewPokestop.js';
import { getCurrentDate } from './getCurrentDate.js';
import { sendChangeRequestEmail } from './sendChangeRequestEmail.js';


export function addListeners() {

  $("#add-new-pokestop-button").on("click", (e) => {
    e.preventDefault();
    let newPokeStopObject = {
      name: $(`#add-new-pokestop-name`).val(),
      latitude: +$(`#add-new-pokestop-latitude`).val(),
      longitude: +$(`#add-new-pokestop-longitude`).val(),
      date_submitted: new Date().toISOString().slice(0, 19).replace('T', ' '),
    };
    console.log('newPokestopObject', newPokeStopObject);
    addNewPokestop(newPokeStopObject)
    .then(result => {
      console.log('result of addNewPokestop', result);
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
        task_date_string: getCurrentDate(),
        // task_date_and_submission_time: new Date().toISOString().slice(0, 19).replace('T', ' '),
        // task_date_end_time: new Date().toISOString().slice(0, 8) + (new Date().getUTCDate() + 1) + " 00:00:00",
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
