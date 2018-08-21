
export function addTask(taskObject){
  return new Promise((resolve, reject)=>{
    // $.ajax({
    //   type: 'POST',
    //   url: `http://127.0.0.1:8080/addTask/${taskObject.id}`,
    //   data: taskObject,
    //   success: function(result){
    //     console.log('result:',result);
    //   }
    // })
    $.post(`http://127.0.0.1:8080/addTask/${taskObject.id}`,
      taskObject,
      function(data, result){
        console.log('data:',data);
        console.log('result:',result);
        resolve(data);
      }
    )
  })

  console.log('add Task clicked! taskObject: ', taskObject);
}
