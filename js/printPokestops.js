
'use strict';
export function printPokestops(pokestopsArray, specialObject, searchBool) {
  // Tooltip: will be displayed to the side, permanently
  // Popup: this will only be displayed if the user clicks the pindrop
  // if there is a task available for that pokestop, make it red:
  // otherwise, make it opaque blue
  pokestopsArray.forEach(pokestop => {
    if(pokestop.active === 'true'){
      L.marker([pokestop.latitude, pokestop.longitude],{icon: specialObject.redPin })
      .bindPopup(`
      <span><b>${pokestop.name}</b></span><br>
      <span>Task: ${pokestop.requirements}</span><br>
      <span>Reward: ${pokestop.reward}</span><br>
      `)
      .bindTooltip(`
        <span>${pokestop.reward}</span>
        `,
        {permanent: true})
      .addTo(specialObject.Active);
    } else if (pokestop.active === 'false' && !searchBool ) {
      L.marker([pokestop.latitude, pokestop.longitude],
        { icon: specialObject.bluePin, opacity: 0.6 })
      .bindPopup(`
        <br>
        <div class="addTask">
          <h1>${pokestop.name}</h1>
          <input id="${pokestop.id}task" type="text" placeholder="task" required>
          <input id="${pokestop.id}reward" type="text" placeholder="reward" required>
          <input class="addTaskButton" id="${pokestop.id}" type="button" value="add task">
        </div>
      `)
      .addTo(specialObject.Regular);
    }
  });
}
