'use strict';
import { secrets } from './secrets.js';
import { getPokestops } from './js/getPokestops.js';
import { rewardSearch } from './js/rewardSearch.js';
import { printPokestops } from './js/printPokestops.js';
import { addNewPokestop } from './js/addNewPokestop.js';
import { getOnePokestop } from './js/getOnePokestop.js';
import { addTask } from './js/addTask.js';

// These 4 are variables used for the Leaflet map
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

// These are the 3 layerGroups that hold pin associations for the map
const Regular = L.layerGroup();
const Active = L.layerGroup();
const SearchResults = L.layerGroup();

// This object is used just to pass these variables to the printPokestops function, and other functions
const mapPropertiesObject = { bluePin, redPin, Regular, Active, SearchResults };

getPokestops()
  .then(allPokestops => {

    /***********************/
    /***** Map options *****/
    /***********************/

    // Urls required for access to the map tile layers
    const mbAttr = '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      mbUrl = `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${secrets().mapboxKey}`;

    // Default tile layer is from Open Street Map
    const  roadmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: mbAttr });

    // Optional tile layers are from MapBox
    const grayscale = L.tileLayer(mbUrl, { id: 'mapbox.light', attribution: mbAttr }),
      dark = L.tileLayer(mbUrl, { id: 'mapbox.dark', attribution: mbAttr }),
      comic = L.tileLayer(mbUrl, { id: 'mapbox.comic', attribution: mbAttr }),
      pirates = L.tileLayer(mbUrl, { id: 'mapbox.pirates', attribution: mbAttr }),
      pencil = L.tileLayer(mbUrl, { id: 'mapbox.pencil', attribution: mbAttr }),
      streets_satellite = L.tileLayer(mbUrl, { id: 'mapbox.streets-satellite', attribution: mbAttr }),
      streets_basic = L.tileLayer(mbUrl, { id: 'mapbox.streets-basic', attribution: mbAttr });

    // Map instantiation
    const map = L.map('map', {
      center: [36.1497012, -86.8144697],
      zoom: 15,
      layers: [roadmap, mapPropertiesObject.Active, mapPropertiesObject.Regular],
      tap: true
    });

    /************************/
    /***** Map controls *****/
    /************************/

    // Control: adds the geolocation control to the map (third party npm)
    L.control.locate({
      drawCircle: false,
      icon: "actually-good-my-location-icon",
      locateOptions: {
        enableHighAccuracy: true
      }
    }).addTo(map);
    $(".actually-good-my-location-icon").append("<img class='my-location-image'  src='./images/my_location_grey.png' />");

    // Control: Custom-made map control for addNewPokestop
    // When clicked, it reveals the add-new-pokestop form and hides the search input
    L.Control.AddPokestopControl = L.Control.extend({
      onAdd: function (map) {
        var img = L.DomUtil.create('img', 'leaflet-bar leaflet-control leaflet-control-custom');
        img.src = './images/add-pokestop.png';
        img.style.width = 'auto';
        img.onclick = (e) => {

          // this disables the click event that occurs on the map BEHIND the control button
          L.DomEvent.stopPropagation(e);
          e.stopPropagation();

          // when the control is clicked, the two forms are toggled
          $("#search-form-div").toggle();
          $("#add-new-pokestop-form-div").toggle();
        };
        return img;
      }
    });
    L.control.addpokestopcontrol = function (opts) {
      return new L.Control.AddPokestopControl(opts);
    };
    L.control.addpokestopcontrol({ position: 'bottomleft' }).addTo(map);

    /************************/
    /****** Map Tiles *******/
    /************************/

    const baseLayers = {
      "Roadmap": roadmap,
      "Grayscale": grayscale,
      "Streets Basic": streets_basic,
      "Streets Satellite": streets_satellite,
      "Dark": dark,
      "Comic": comic,
      "Pirates": pirates,
      "Pencil": pencil,
    };

    const overlays = {
      "Active Task": mapPropertiesObject.Active,
      "Inactive": mapPropertiesObject.Regular
    };

    L.control.layers(baseLayers, overlays).addTo(map);

    /****************************/
    /***** Event Listeners ******/
    /****************************/

    // Add New Pokestop form
    $("#add-new-pokestop-button").on("click", (e) => {
      e.preventDefault();
      let newPokeStopObject = {
        name: $(`#add-new-pokestop-name`).val(),
        latitude: +$(`#add-new-pokestop-latitude`).val(),
        longitude: +$(`#add-new-pokestop-longitude`).val(),
        // date_submitted: accomplished with SQL
      };
      addNewPokestop(newPokeStopObject)
        .then(result => {
          $(`#add-new-pokestop-name`).val("");
          $(`#add-new-pokestop-latitude`).val("");
          $(`#add-new-pokestop-longitude`).val("");
          getOnePokestop(result.pokestopId)
            .then(newPokestopArray => {
              printPokestops(newPokestopArray, mapPropertiesObject, false, true);
            });
        });
    });

    // Search input form
    $("#reward-search").on("keyup", function () {

      // On each keystroke in the search input, a GET request is sent, and several actions happen:
      // 1. The previous search results are cleared from its layerGroup
      // 2. The Active and Regular layerGroups are hidden from the map
      // 3. The search results are added the the layerGroup, then added to the map
      if($("#reward-search").val()){
        rewardSearch($("#reward-search").val())
        .then(results => {
          SearchResults.clearLayers(); // This method removes all pins from the layerGroup
          Active.removeFrom(map); // This method just hides the selected Layer, without deleting it's pin associations
          Regular.removeFrom(map);
          printPokestops(results, mapPropertiesObject, true, false);
          SearchResults.addTo(map);
        });
      } else {
        // This runs when the search bar is cleared:
        // 1. The Active and Regular laygerGroups are shown on the map again
        // 2. The SearchResults layerGroup is hidden from the map
        // 3. The SearchResults layerGroup is cleared: It's pin associations are removed from the layerGroup
        Active.addTo(map);
        Regular.addTo(map);
        SearchResults.removeFrom(map);
        SearchResults.clearLayers();
      }
    });

    $(document).ready(function () {

      // map pins are not created in the DOM until the document is ready
      printPokestops(allPokestops, mapPropertiesObject, false, false);
      console.log('mapmugs',mapPropertiesObject);
      // hide the add-new-pokestop form to make it togglable
      $("#add-new-pokestop-form-div").hide();

      // on-document listener for the dynamic addTask buttons on pin popups
      $(document).on("click", e => {
        if ($(e.target).hasClass("addTaskButton") &&
            $(`#${e.target.id}task`).val() &&
            $(`#${e.target.id}reward`).val()) {
          let taskObject = {
            requirements: $(`#${e.target.id}task`).val(),
            reward: $(`#${e.target.id}reward`).val(),
            pokestop_id: +e.target.id,
            // task_date_and_submission_time: accomplished with SQL
            // task_date_end_time: accomplished with SQL
          };
          addTask(taskObject)
          .then(result => {
            // after submitting the new task, immediately GET that task from the db and print it to the DOM
            return getOnePokestop(result.pokestopId);
          })
          .then(newPokestopArray => {
            map.closePopup();
            printPokestops(newPokestopArray, mapPropertiesObject, false, false);
          });
        }
      });

      // The lat/long values are inserted into the add-new-pokestop form fields on map click
      map.on('click', (e) => {
        $("#add-new-pokestop-latitude").val(e.latlng.lat);
        $("#add-new-pokestop-longitude").val(e.latlng.lng);

      });

    }); // end of document.ready function

  }); // end of getPokestops function

