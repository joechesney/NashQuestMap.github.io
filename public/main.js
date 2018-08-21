import { secrets } from '/secrets.js';
import { getPokestops } from '/getPokestops.js';
import { getCurrentDate } from './getCurrentDate.js';
firebase.initializeApp(secrets.config);

getPokestops().then(pokestops=>console.log('all stops 2: ',pokestops));

/*
  - Each pokestop quest will have a time attached to it. When the page loads, it will take the current time,
  and search my database for times that are for the current day. I will basically have to manually
  delete tasks over time. Most likely the only time i need is "MMDDYYYY" or something like that.
  So when the page is loaded, it will compare the current day to the day of any available quests
  for the pokestops on the map.

  If a stop does not have a task reported yet, then it displays as a gray pin,
    and when you click the stop a popup will appear, with the stops name and 2 input boxes:
    one input for the task requirements, and one for the reward
      - When this info is submitted, it needs to contain the current date, and time,
      the pokestop ID, and the two quest input values.


  If a stop already has a its daily task reported for that day, then it will display a red pin.
    There will be a permanent tooltip that displays for these that will show just the reward.
    Clicking on these stops will open up a box that has the pokestop name, the task requirements,
    and the reward listed. Possibly could also add the address or something?


  NOTE: there is a difference between a popup and a tooltip for the pins. A popup only apprears when
    the user clicks on the pin. And a tooltip is a permanent bubble that appears next to the pin

*/

const greenEgg = L.icon({
  iconUrl: 'node_modules/leaflet/dist/images/marker-icon.png',

  iconSize:      [21, 35], // size of the icon
  iconAnchor:    [18, 41], // point of the icon which will correspond to marker's location
  popupAnchor:   [-7, -40],  // point from which the popup should open relative to the iconAnchor
  tooltipAnchor: [10, -20]
});

const redEgg = L.icon({
  iconUrl: './images/red-pin.png',

  iconSize:      [21, 35], // size of the icon
  iconAnchor:    [18, 41], // point of the icon which will correspond to marker's location
  popupAnchor:   [-7, -40],  // point from which the popup should open relative to the iconAnchor
  tooltipAnchor: [10, -20]
});

const Regular = L.layerGroup();
// <?php echo $StopMarkers_Regular; ?>
L.marker([0,0],{opacity: 1.0}).bindPopup('TEST').addTo(Regular);

const Active = L.layerGroup();
// <?php echo $StopMarkers_Active; ?>
L.marker([0,0],{opacity: 1.0}).bindPopup('TEST').addTo(Active);


const mbAttr = '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
  mbUrl = `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${secrets.mapbox_API_key}`;

const grayscale   = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
  streets  = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr});

const map = L.map('map', {
  center: [36.1497012,-86.8144697],
  zoom: 18,
  layers: [streets, Active, Regular]
});

const baseLayers = {
  "Grayscale": grayscale,
  "Streets": streets
};

const overlays = {
  "Active Study": Active,
  "Inactive": Regular
};


map.on('click', (e)=>{
  console.log(`${e.latlng.lat}`);
  console.log(`${e.latlng.lng}`);
  console.log(`-----------`);
  getCurrentDate();

})
L.control.layers(baseLayers, overlays).addTo(map);
// L.marker([36.150249,-86.8128233]).addTo(Active);
// L.marker([36.149596, -86.811927]).addTo(Regular);

// const pokestops = [
//   {latitude: 36.150400123879905, longitude: -86.81216620062756, name: "Centennial Exposition Plaque", id: 1, activeTask: true},
//   {latitude: 36.149618, longitude: -86.812215, name: "Butterfly Planter", id: 2, activeTask: false},
//   {latitude: 36.149596, longitude: -86.811927, name: "Lizard Planter", id: 3, activeTask: true},
//   {latitude: 36.14974886537123, longitude: -86.81140367618082, name: "Bench Please", id: 4, activeTask: false},
// ];

getPokestops()
.then(pokestops=>{


  pokestops.forEach(pokestop => {
    // Tooltip: will be displayed to the side, permanently
    // Popup: this will only be displayed if the user clicks the pindrop

    // if it has activeTask task, make it red:
    if(pokestop.activeTask){
      L.marker([pokestop.latitude, pokestop.longitude],{icon: redEgg, })
      .bindPopup(pokestop.name)
      .bindTooltip(`
        <span>${pokestop.id}</span>
        `,
        {permanent: true})
      .addTo(Regular);
    } else { // These will be opaque blue
      L.marker([pokestop.latitude, pokestop.longitude], { icon:greenEgg, opacity: 0.2 })
      .bindPopup(`
        ${pokestop.name}<br>
        <br><a href="/addTask?${pokestop.id}">Edit Task</a>
      `)
      // .bindTooltip(`
      //   <span>${pokestop.id}</span>

      //   `)
      .addTo(Regular);

    }
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

  });
})