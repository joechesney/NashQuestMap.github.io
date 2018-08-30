
export function rewardSearch(query) {
  console.log('query', query);
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:8080/rewardSearch/?task_reward=${query}`,
      method: 'GET',
      xhrFields: {
        withCredentials: false
      },
      success: function (data) {
        resolve(data);
      },
      error: function (err) {
        console.log(err);
        reject(err);
      }
    });
  });
};
