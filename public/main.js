import { secrets } from '/secrets.js';
import { getPokestops } from './js/getPokestops.js';
import { addListeners } from './js/listeners.js';
import { rewardSearch } from './js/rewardSearch.js';

addListeners(); // adds event listeners to the page

$("#reward-search-button").on("click", function() {
  console.log('query mug: ',$("#reward-search").val());
  rewardSearch($("#reward-search").val())
  .then(results => {
    console.log('results of query',results);
    Active.clearLayers(); //Maybe should remove Regular layer too?
    results.forEach(pokestop => {
      printPokestops(results, specialObject, true);
    })
  })
});

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

var Active = L.layerGroup();

let specialObject = { bluePin, redPin, Regular, Active };

import { printPokestops } from './js/printPokestops.js';
getPokestops()
.then(allPokestops=>{
  console.log('allPokestops',allPokestops);
  // Tooltip: will be displayed to the side, permanently
  // Popup: this will only be displayed if the user clicks the pindrop
  // if there is a task available for that pokestop, make it red:
  // otherwise, make it opaque blue
  printPokestops(allPokestops, specialObject, false);



  var mbAttr = '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    mbUrl = `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${secrets.mapbox_API_key}`;

  var grayscale = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
    streets  = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr});

  var map = L.map('map', {
    center: [36.1497012,-86.8144697],
    zoom: 17,
    layers: [grayscale, Active, Regular]
  });

  // This line centers the map on the users location if they accept geolocation
  // map.locate({setView: true, maxZoom: 16});
  L.control.locate({drawCircle: false, icon: "actually-good-my-location-icon"}).addTo(map);
  $(".actually-good-my-location-icon").append("<img class='my-location-image'  src='./images/my_location_grey.png' />")
  function onLocationFound(e) {
    // This function shows a marker and circle around your current location
    // It was cool that it worked, but its pretty pointless tbh
    console.log('event:', e);
    var radius = e.accuracy / 2;
    L.marker(e.latlng).addTo(map)
      .bindPopup("You are within " + radius + " meters from this point").openPopup();
    L.circle(e.latlng, radius).addTo(map);
  }
  // map.on('locationfound', onLocationFound);
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
