# PoGoTaskMap-Client
Client side of PoGoTaskMap

# NashQuestMap.github.io

This a project designed to help Pokemon Go players submit daily quest rewards. The entire project is designed to be as simple as possible. No logins. No menus. No fluff. No frills. Just a map, with all the pokestops, and the ability to submit daily quests at each pokestop.

This project started in July 2018, and is planned to be released to the public by September 2018.



## How to use the site

### Reading the map
1. By default, the map is centered on Centennial Park in Nashville, Tn.
2. All pokestops by default will display as transparent blue pins on the map.
3. If a pokestop has had a research task submitted TODAY, then it will display as a red pin, and the reward will be a permanent tooltip displayed attached to that pokestop pin.
4. Research tasks, right now, are set to overwrite if a user submits a new research task for the same pokestop on the same day.
5. That's all this site does. It just shows you quickly any valuable research rewards that have been submitted today.

### submitting a research task
1. Find the pokestop that has the task, click it, and a info window should appear on the pin.
2. Fill out the "requirements" of the research task, and the "reward", then press the "submit" button.
3.That's it!

### submitting a new pokestop
1. For now, just click on the pokestops location on the map, which will auto-fill the latitude and longitude of the click location into the form fields at the bottom of the screen.
2. Type in the name of the pokestop
3. Hit submit.
4. That's it!

### Important Notes:
There is a restriction on the database to only allow pokestops to be submitted if they are within these approximate bounds: ![Map of pokestop boundaries](./images/boundary-map.jpg?raw=true "Boundary Map")