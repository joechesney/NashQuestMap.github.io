# PoGoTaskMap-Client
This repo contains the client-side code for [PoGoTaskMap](https://pogotaskmap.firebaseapp.com/).

If you wish to see the SERVER-SIDE code of this project: [https://github.com/joechesney/PoGoTaskMap-Server](https://github.com/joechesney/PoGoTaskMap-Server)


# NashQuestMap.github.io

This is a project designed to help Pokemon Go players sshare daily task rewards. The entire project is designed to be as simple as possible. No logins. No menus. No fluff. No frills. Just a map, with all the pokestops, and the ability to submit daily quests at each pokestop.

This project started in July 2018, and was released on September 8th, 2018. It is currently still receiving updates.

All Pokestops are user-submitted, and are neither guaranteed to be complete, nor appropriate.



## How to use the site

### Reading the map
1. By default, the map is centered on Centennial Park in Nashville, Tn. This may be changed in a future update.
2. Press the 'my location' symbol in the top left of the map to center the map on your device's current location.
3. All pokestops by default will display as transparent blue pins on the map.
4. If a pokestop has had a research task submitted TODAY, then it will display as a red pin, and the reward will be a permanent tooltip displayed attached to that pokestop pin.
5. Research tasks, right now, cannot be overwritten. Once submitted, the pop-up box will display that task and that task only.
6. That's all this site does. It just shows you, quickly, any valuable research rewards that have been submitted today.

### Submitting a research task
1. Find the pokestop that has the task, click it, and an info window pop-up box should appear attached to the pin.
2. Fill out the "requirements" and the "reward" of the research task, then press the "submit" button.
3. The page will reload.
4. That's it! The pokestop you submitted to will now display red, with the task reward visible.

### Submitting a new pokestop
1. Read the "Important Notes" section of this documentation below.
2. Just click on the pokestops location on the map, the site will auto-fill the latitude and longitude of the click location into the form fields at the bottom of the screen.
3. Type in the name of the pokestop in the correct form input.
4. Hit submit.
5. The page will reload.
6. That's it! Your new pokestop will be displayed.

### Important Notes:
There is a restriction on the database to only allow pokestops to be submitted if they are within these approximate bounds: ![Map of pokestop boundaries](./images/boundary-map.jpg?raw=true "Boundary Map")