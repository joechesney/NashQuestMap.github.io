
'use strict';
import { sendChangeRequestEmail } from './js/models/sendChangeRequestEmail.js';
$(document).on("click", e => {
  if(e.target.id === "submit-change-request"){
    let changeRequestObject = {
      userEmail: $("#user-email").val(),
      changesRequested: $("#changes-requested").val()
    };
    sendChangeRequestEmail(changeRequestObject)
    .then(response => {
      $(`#user-email`).val("");
      $(`#changes-requested`).val("");
      alert("Your message has been received. Thank you.")
    });
  }
});
