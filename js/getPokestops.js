// This file will just get the pokestops from my firebase and print them on the screen on first page load

export function getPokestops() {
  return new Promise((resolve, reject)=>{
    $.get("http://localhost:8080/getPokestops")
    .then(pokestopsArray=>{
      if(pokestopsArray.length > 0){
        resolve(pokestopsArray);
      }
      else {
        reject(err);
      }
    });
  });
};
