

export function getTodaysTasks(task_date_string) {
  return new Promise((resolve, reject) => {
    $.get(`http://localhost:8080/getTodaysTasks/${task_date_string}`)
    .then(tasksArray => {
      console.log('tasksArray ', tasksArray);
      if (tasksArray) {
        resolve(tasksArray);
      }
      else {
        reject(err);
      }
    });
  });
};