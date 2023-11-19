firebase.initializeApp(firebaseConfig);

var db = firebase.database();
const stationsRef = db.ref("station");

// Retrieve the station ID from the query parameter in the URL
const urlParams = new URLSearchParams(window.location.search);
const stationId = urlParams.get("stationId");

// Display the station ID in the header
const stationIdHeader = document.getElementById("stationIdHeader");
stationIdHeader.textContent = stationId;


const stationRef = firebase.database().ref("station/" + stationId + "/terminals");

// Reference to AC and DC terminals tables
const acTerminalsTable = document.getElementById("acTerminalsTable").getElementsByTagName('tbody')[0];
const dcTerminalsTable = document.getElementById("dcTerminalsTable").getElementsByTagName('tbody')[0];

// Function to create a button for each terminal
function createTerminalButton(terminalId) {
    const button = document.createElement("button");
    button.textContent = "Add Slot";
    
        button.addEventListener("click", function() {
            // Redirect to the "slotpage" with the terminal ID
            window.location.href = "slot.html?stationId=" + stationId + "&terminalId=" + terminalId;
        });
        return button;
   
}

// Function to display terminals in the corresponding tables
function displayTerminals(snapshot, table) {
    snapshot.forEach(function(childSnapshot) {
        const terminalData = childSnapshot.val();
        const terminalId = terminalData.terminalId;

        const row = table.insertRow(table.rows.length);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);

        cell1.textContent = terminalId;
        const button = createTerminalButton(terminalId);
        cell2.appendChild(button);
    });
}

// Fetch and display AC terminals
stationRef.orderByChild("type").equalTo("AC").on("value", function(snapshot) {
    acTerminalsTable.innerHTML = ""; // Clear the table
    displayTerminals(snapshot, acTerminalsTable);
});

// Fetch and display DC terminals
stationRef.orderByChild("type").equalTo("DC").on("value", function(snapshot) {
    dcTerminalsTable.innerHTML = ""; // Clear the table
    displayTerminals(snapshot, dcTerminalsTable);
});