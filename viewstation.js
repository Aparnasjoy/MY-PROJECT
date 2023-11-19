firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const stationsRef = db.ref("station");

const stationsList = document.getElementById("stationsList");

function createStationRow(station) {
    const row = document.createElement("tr");
    
    const stationId = document.createElement("td");
    stationId.textContent = station.stationId;
    row.appendChild(stationId);

    const stationManager = document.createElement("td");
    stationManager.textContent = station.managerId;
    row.appendChild(stationManager);

    const location = document.createElement("td");
    location.textContent = station.location;
    row.appendChild(location);

    // Add more fields as needed, e.g., totalTerminals, acTerminals, and dcTerminals
    const totalTerminals = document.createElement("td");
    totalTerminals.textContent = station.totalTerminals;
    row.appendChild(totalTerminals);

    const acTerminals = document.createElement("td");
    acTerminals.textContent = station.acTerminals;
    row.appendChild(acTerminals);

    const dcTerminals = document.createElement("td");
    dcTerminals.textContent = station.dcTerminals;
    row.appendChild(dcTerminals);

    return row;
}


// Function to display all stations
function displayStations() {
    stationsRef.once("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            const stationData = childSnapshot.val();
            const stationRow = createStationRow(stationData);
            stationsList.appendChild(stationRow);
        });
    });
}

// Call the function to display stations when the page loads
displayStations();
