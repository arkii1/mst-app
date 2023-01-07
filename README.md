# mst-app
A data-driven application which displays displays and updates a table.

Url to site: https://arkii1.github.io/mst-app/

## Build process
1. Create react boiler plate using create-react-app and remove unwanted boiler plate from that. Also install/initialize eslint, .gitignore and other configs/packages.
2. Learned basics of socket.io from [introduction documentation](https://socket.io/docs/v4/) and tested in App.js using console.logs.
3. Transfered this logic to a DataContext which updates an allData state when the event 'data-update' is called.
4. Create an initial table element, then make it more attractive using TailwindCSS.
5. Implement the sorting logic inside Table.js.
6. Go through and clean up code.

Thoughts:
I assume there is no way to access the data other than the event 'data-update', meaning the data slowly loads one at a time. I tested this through an [online api testing tool](https://reqbin.com/) and it shows only one event is defined, meaning I can't display all the data on first render unless I store it manually, so decided to leave this in a real life scenario this would be accessible from the data server.

Some future functionality ideas:
1. Clicking on row takes you to a 'player details' page.
2. Using colour to showcase how well a player has done on each hole/overall.
3. Add graphs for statistics, e.g. a line graph with hole number on x-axis, and number of puts/relative to par on y-axis.
4. Split header names correctly. Attempted a splitCamelCase function, however it made keys like "MTSID" into "M S T I D", so decided to stop there.
