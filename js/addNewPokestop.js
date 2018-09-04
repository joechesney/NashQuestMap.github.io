
export function addNewPokestop(newPokestopObject) {
  console.log('newPokestopObject', newPokestopObject);
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:8080/addNewPokestop`,
      method: 'POST',
      xhrFields: {
        withCredentials: false
      },
      // headers: {
      // },
      data: newPokestopObject,
      success: function (data) {
        console.log('Success', data);
        resolve(data);
      },
      error: function (err) {
        console.log(err);
        reject(err);
      }
    });
  });
};
