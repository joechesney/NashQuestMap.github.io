import { addTask } from './addTask.js';
export function addListeners() {

  $(document).on("click", e => {
    e.preventDefault();

    if (e.target.className === "addTaskButton"){
      let taskObject = {
        task: $(`#${e.target.id}task`).value,
        reward: $(`#${e.target.id}reward`).value,
        id: e.target.id
      }
      addTask(taskObject);
    }

  })
}
