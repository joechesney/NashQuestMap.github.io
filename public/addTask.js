
export function addTask(taskObject) {
  console.log('taskObject', taskObject);
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:8080/addTask/${taskObject.pokestop_id}`,
      method: 'POST',
      xhrFields: {
        withCredentials: false
      },
      // headers: {
      // },
      data: taskObject,
      success: function (data) {
        console.log('Success', data);
        resolve(data);
      },
      error: function (err) {
        console.log('We are sorry but our servers are having an issue right now');
        reject(err);
      }
    });
  });
};
