import { secrets } from '/secrets.js';
import { getPokestops } from '/getPokestops.js';
import { addListeners } from './listeners.js';
addListeners(); // adds event listeners to the page

var bluePin = L.icon({
  iconUrl: 'node_modules/leaflet/dist/images/marker-icon.png',
  iconSize:      [21, 35], // size of the icon
  iconAnchor:    [18, 41], // point of the icon which will correspond to marker's location
  popupAnchor:   [-7, -40],  // point from which the popup should open relative to the iconAnchor
  tooltipAnchor: [10, -20]
});

var redPin = L.icon({
  iconUrl: './images/red-pin.png',
  iconSize:      [21, 35], // size of the icon
  iconAnchor:    [18, 41], // point of the icon which will correspond to marker's location
  popupAnchor:   [-7, -40],  // point from which the popup should open relative to the iconAnchor
  tooltipAnchor: [10, -20]
});

var Regular = L.layerGroup();
// L.marker([0,0],{opacity: 1.0}).bindPopup('TEST').addTo(Regular);

var Active = L.layerGroup();
// L.marker([0,0],{opacity: 1.0}).bindPopup('TEST').addTo(Active);
console.log('new Date()',new Date());
getPokestops()
.then(allPokestops=>{
  console.log('allPokestops',allPokestops);
  // Tooltip: will be displayed to the side, permanently
  // Popup: this will only be displayed if the user clicks the pindrop
  // if there is a task available for that pokestop, make it red:
  allPokestops.forEach(pokestop => { // These will be opaque blue

    /*
      3 cases here:
      1. if the pokestop has a task, it is given a red pin
      2. if the pokestop does not have a task, it is given a blue pin
      3.
    */
    if(pokestop.active === 'true'){
      L.marker([pokestop.latitude, pokestop.longitude],{icon: redPin })
      .bindPopup(`
      <span><h3>${pokestop.name}</h3></span><br>
      <span>Task: ${pokestop.requirements}</span><br>
      <span>Reward: ${pokestop.reward}</span><br>

      `)
      .bindTooltip(`
        <span>${pokestop.reward}</span>
        `,
        {permanent: true})
      .addTo(Active);
    } else if (pokestop.active === 'false') {
      L.marker([pokestop.latitude, pokestop.longitude],
        { icon:bluePin, opacity: 0.2 })
      .bindPopup(`
        <br>
        <div class="addTask">
          <h1>${pokestop.name}</h1>
          <input id="${pokestop.id}task" type="text" placeholder="task" required>
          <input id="${pokestop.id}reward" type="text" placeholder="reward" required>
          <input class="addTaskButton" id="${pokestop.id}" type="button" value="add task">
        </div>
      `)
      .addTo(Regular);
    } else {
      console.log('3rd condition',pokestop);
      // L.marker([pokestop.latitude, pokestop.longitude],
      //   { icon:bluePin, opacity: 0.2 })
      //   .bindPopup(`
      //   <div>
      //     <br>
      //     <b>${pokestop.requirements}</b>
      //     <b>${pokestop.reward}</b>

      //   </div>
      //   `).addTo(Active)
    }
  });



  var mbAttr = '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    mbUrl = `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${secrets.mapbox_API_key}`;

  var grayscale = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
    streets  = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr});

  var map = L.map('map', {
    center: [36.1497012,-86.8144697],
    zoom: 18,
    layers: [grayscale, Active, Regular]
  });

  var baseLayers = {
    "Grayscale": grayscale,
    "Streets": streets
  };

  var overlays = {
    "Active Task": Active,
    "Inactive": Regular
  };

  L.control.layers(baseLayers, overlays).addTo(map);

  map.on('click', (e)=>{
    console.log(`${e.latlng.lat}`);
    console.log(`${e.latlng.lng}`);
    // console.log(getCurrentDate());
    console.log('Date.now()',Date.now());
    console.log(`-----------`);
    $("#add-new-pokestop-latitude").val(e.latlng.lat);
    $("#add-new-pokestop-longitude").val(e.latlng.lng);
  })
});


// Need to check run conditions for when there are 0 tasks at all,
//   one task, many tasks for many pokestops, and multiple tasks
//   for the same pokestop

// Need a handler for if a task is created for a stop, and then
// that stop is deleted
