import { secrets } from '/secrets.js';
import { getPokestops } from '/getPokestops.js';
import { getCurrentDate } from './getCurrentDate.js';
import { addListeners } from './listeners.js';
addListeners(); // adds event listeners to the page

const bluePin = L.icon({
  iconUrl: 'node_modules/leaflet/dist/images/marker-icon.png',
  iconSize:      [21, 35], // size of the icon
  iconAnchor:    [18, 41], // point of the icon which will correspond to marker's location
  popupAnchor:   [-7, -40],  // point from which the popup should open relative to the iconAnchor
  tooltipAnchor: [10, -20]
});

const redPin = L.icon({
  iconUrl: './images/red-pin.png',
  iconSize:      [21, 35], // size of the icon
  iconAnchor:    [18, 41], // point of the icon which will correspond to marker's location
  popupAnchor:   [-7, -40],  // point from which the popup should open relative to the iconAnchor
  tooltipAnchor: [10, -20]
});

const Regular = L.layerGroup();
L.marker([0,0],{opacity: 1.0}).bindPopup('TEST').addTo(Regular);

const Active = L.layerGroup();
L.marker([0,0],{opacity: 1.0}).bindPopup('TEST').addTo(Active);


const mbAttr = '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
  mbUrl = `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${secrets.mapbox_API_key}`;

const grayscale   = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
  streets  = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr});

let map = L.map('map', {
  center: [36.1497012,-86.8144697],
  zoom: 18,
  layers: [grayscale, Active, Regular]
});

const baseLayers = {
  "Grayscale": grayscale,
  "Streets": streets
};

const overlays = {
  "Active Task": Active,
  "Inactive": Regular
};

L.control.layers(baseLayers, overlays).addTo(map);

map.on('click', (e)=>{
  console.log(`${e.latlng.lat}`);
  console.log(`${e.latlng.lng}`);
  console.log(getCurrentDate());
  console.log(`-----------`);
  $("#add-new-pokestop-latitude").val(e.latlng.lat);
  $("#add-new-pokestop-longitude").val(e.latlng.lng);
})


// Need to check run conditions for when there are 0 tasks at all,
//   one task, many tasks for many pokestops, and multiple tasks
//   for the same pokestop

// Need a handler for if a task is created for a stop, and then
// that stop is deleted

getPokestops()
.then(allPokestops=>{
  // Tooltip: will be displayed to the side, permanently
  // Popup: this will only be displayed if the user clicks the pindrop

  // if there is a task available for that pokestop, make it red:
  allPokestops.forEach(pokestop => { // These will be opaque blue
    if(pokestop.active === 'true'){

      L.marker([pokestop.latitude, pokestop.longitude],{icon: redPin })
      .bindPopup(`<span>pokestop.name</span>`)
      .bindTooltip(`
        <span>${pokestop.reward}</span>
        <br>
        <span>${pokestop.requirements}</span>
        `,
        {permanent: true})
      .addTo(Active);

    }
    if (pokestop.active === 'false') {

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

      L.marker([pokestop.latitude, pokestop.longitude],
        { icon:bluePin, opacity: 0.2 })
        .bindPopup(`
        <div>
          <br>
          <b>${pokestop.requirements}</b>
          <b>${pokestop.reward}</b>
          <a href="" id="${pokestop.id}editTaskButton">edit</a>
        </div>
        `).addTo(Active)


    }
  });
});

// This was the original code from PHP project:

/*
if ($duprow['ActiveInactive'] == 'Active') {

  $StopMarkers_Active .= "L.marker(["
    . $duprow['stop_Latitude'] .
  ","
    . $duprow['stop_Longitude'] .
  "],{"
    . $Hatched_Icon .
  "opacity: 1.0}).bindTooltip('"							// bindTooltip

    . "<b>"
    . substr($duprow['Reward'],0,15) .
    "</b><BR>" .

  "',{permanent: true}).addTo(Active),"
  ;
}

// Display clickable pop-up withadditional details, for active Pokestop field study.

if ($duprow['ActiveInactive'] == 'Inactive') {

  $StopMarkers_Regular .= "L.marker(["
    . $duprow['stop_Latitude'] .
  ","
    . $duprow['stop_Longitude'] .
  "],{opacity: 0.2}).bindPopup('"
    . $duprow['stop_Name'] .

  "<BR><A HREF=\"/AddStudy.php?stopid="
    . urlencode( $duprow['stop_id'] ) .
  "\">Report Field Study</A>" .

  "').addTo(Regular),"
  ;

// If stop doesn't contain a reported field study, then display transparent pokestop icon.

} else {

  $StopMarkers_Active .= "L.marker(["
    . $duprow['stop_Latitude'] .
  ","
    . $duprow['stop_Longitude'] .
  "],{opacity: 0.2}).bindPopup('"
    . $duprow['stop_Name'] .

  "<BR><b>"
    . substr($duprow['Reward'],0,15) .
  "</b><BR>Task: "
    . $duprow['Study_text'] .

  "<BR><A HREF=\"/tables/tbl_ActiveStops.php?stopid="
    . urlencode( $duprow['stop_id'] ) .
  "\" TARGET=\"REPORTRAID\">Edit</A><BR>" .

  "<BR><A HREF=\"https://www.google.com/maps/?daddr="
    . $duprow['stop_Latitude'] .
  ","
    . $duprow['stop_Longitude'] .
  "\" TARGET=\"DIRECTIONS\">Directions</A>" .

  "').addTo(Active),"
  ;
}
*/