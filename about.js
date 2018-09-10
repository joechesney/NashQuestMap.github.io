
'use strict';
import { sendChangeRequestEmail } from './js/sendChangeRequestEmail.js';
  $(document).on("click", e => {
    if(e.target.id === "submit-change-request"){
      let changeRequestObject = {
        userEmail: $("#user-email").val(),
        changesRequested: $("#changes-requested").val()
      };
      sendChangeRequestEmail(changeRequestObject)
      .then(response => {
        console.log('response: ',response);
      });
    }
  });
