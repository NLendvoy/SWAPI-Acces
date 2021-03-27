# SWAPI-Info Access
A React.js based web app to access and display some information about all characters in the SWAPI database.

## How to run:

Install node package manager here: https://nodejs.org/en/  
To create static server on your local network, in the project directory use:  
- npm install -g serve
- serve -s build

This will give all devices on your local network access through port 5000 or the host device at localhost:5000
- See output of "serve -s build" for specific IP. Should be 172.16.1.x

## Notes:
1. Initial load into each page takes several seconds due to data fetch. Loading screen should be implemented.  
2. App works fine on Edge, Chrome, Firefox for Windows. I have no way of testing MacOS locally.  
3. App works fine on Android but iOS cannot always access secondary data (species, films, etc.). I beileve this is an issue with the get() syntax I am using.
