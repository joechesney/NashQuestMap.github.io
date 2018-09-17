'use strict';
import { secrets } from './secrets.js';
import { getPokestops } from './js/getPokestops.js';
import { addListeners } from './js/listeners.js';
import { rewardSearch } from './js/rewardSearch.js';
addListeners(); // adds event listeners to the page

// this detects whether the device is mobile or desktop
// and changes the map click listeners accordingly
$( document ).ready(function() {
  var isMobile = window.matchMedia("only screen and (max-width: 1060px)");
  isMobile.onchange = function(e){
    console.log('mug changed', e);

    if (isMobile.matches) {
      // listeners for mobile device
        console.log('width less than 760px',isMobile);
    } else {
      // listeners for desktop device
      console.log('larger than 760px',isMobile);
    }
  };
});

/**
 * These 4 are variables used for the Leaflet map
 */
const bluePin = L.icon({
  iconUrl: 'node_modules/leaflet/dist/images/marker-icon.png',
  iconSize: [21, 35], // size of the icon
  iconAnchor: [18, 41], // point of the icon which will correspond to marker's location
  popupAnchor: [-7, -40],  // point from which the popup should open relative to the iconAnchor
  tooltipAnchor: [10, -20]
});
const redPin = L.icon({
  iconUrl: './images/red-pin.png',
  iconSize: [21, 35], // size of the icon
  iconAnchor: [18, 41], // point of the icon which will correspond to marker's location
  popupAnchor: [-7, -40],  // point from which the popup should open relative to the iconAnchor
  tooltipAnchor: [10, -20]
});
const Regular = L.layerGroup();
const Active = L.layerGroup();



// This object is used just to pass in these variables to the printPokestops function
let specialObject = { bluePin, redPin, Regular, Active };

$("#reward-search-button").on("click", function () {
  console.log('query mug: ', $("#reward-search").val());
  rewardSearch($("#reward-search").val())
    .then(results => {
      // console.log('results of query', results);
      Active.clearLayers(); //Maybe should remove Regular layer too?
      printPokestops(results, specialObject, true);
    });
});


import { printPokestops } from './js/printPokestops.js';
getPokestops()
  .then(allPokestops => {
    printPokestops(allPokestops, specialObject, false);

    const mbAttr = '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      mbUrl = `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${secrets().mapboxKey}`;

    const grayscale = L.tileLayer(mbUrl, { id: 'mapbox.light', attribution: mbAttr }),
      streets = L.tileLayer(mbUrl, { id: 'mapbox.streets', attribution: mbAttr });

    const map = L.map('map', {
      center: [36.1497012, -86.8144697],
      zoom: 15,
      layers: [streets, Active, Regular]
    });

    // This adds the geolocation control to the map
    L.control.locate({ drawCircle: false, icon: "actually-good-my-location-icon" }).addTo(map);
    $(".actually-good-my-location-icon").append("<img class='my-location-image'  src='./images/my_location_grey.png' />");

    // Custom map control for adNewPokestop
    L.Control.Watermark = L.Control.extend({
      onAdd: function(map) {
          var img = L.DomUtil.create('img', 'leaflet-bar leaflet-control leaflet-control-custom');
          img.src = './images/add-pokestop.png';
          img.style.width = 'auto';
          img.onclick = (e)=>{
            console.log('new control clicked!',e);
            L.DomEvent.stopPropagation(e);
          };
          return img;
      },
      onRemove: function(map) {
          // Nothing to do here
      }
    });
    L.control.watermark = function(opts) {
      return new L.Control.Watermark(opts);
    };
    L.control.watermark({ position: 'bottomleft' }).addTo(map);

    const baseLayers = {
      "Grayscale": grayscale,
      "Streets": streets
    };

    const overlays = {
      "Active Task": Active,
      "Inactive": Regular
    };

    L.control.layers(baseLayers, overlays).addTo(map);

    map.on('click', (e) => {
      console.log(`${e.latlng.lat}`);
      console.log(`${e.latlng.lng}`);
      $("#add-new-pokestop-latitude").val(e.latlng.lat);
      $("#add-new-pokestop-longitude").val(e.latlng.lng);
    });
  });

