// This file will just get the pokestops from my firebase and print them on the screen on first page load
export function getPokestops() {
  return new Promise((resolve, reject)=>{
    $.get("https://nashquestmap.firebaseio.com/pokestops.json")
    .then(pokestopsObject=>{
      let pokestopsArray = [];
      Object.keys(pokestopsObject).forEach(key=>{
        pokestopsObject[key].id = key;
        pokestopsArray.push(pokestopsObject[key]);
      })
      console.log('pokestopsObject: ',pokestopsObject);
      console.log('pokestopsArray: ',pokestopsArray);
      if(pokestopsArray.length > 0) resolve(pokestopsArray);
      // else reject(err)

    })
  })
}
