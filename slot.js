firebase.initializeApp(firebaseConfig);

var db = firebase.database();
const stationsRef = db.ref("station");


// Retrieve the terminal ID from the query parameter in the URL
const urlParams = new URLSearchParams(window.location.search);
const stationId = urlParams.get("stationId");

// Display the station ID in the header
const stationIdHeader = document.getElementById("stationIdHeader");
stationIdHeader.textContent = stationId;

const terminalId = urlParams.get("terminalId");

// Display the terminal ID in the header
const terminalIdHeader = document.getElementById("terminalIdHeader");
terminalIdHeader.textContent = terminalId;

// You can add additional JavaScript logic for your slot page below
