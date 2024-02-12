// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to Firestore collection
const firestore = firebase.firestore();
const terminalsCollection = firestore.collection("terminals");

// Retrieve the station ID from the query parameter in the URL
const urlParams = new URLSearchParams(window.location.search);
const stationId = urlParams.get("stationId");

// Display the station ID in the header
const stationIdHeader = document.getElementById("stationIdHeader");
stationIdHeader.textContent = stationId;

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

function fetchAndDisplayTerminals(stationId, type, table) {
    firestore.collection("terminals")
        .where("stationId", "==", stationId)
        .where("type", "==", type)
        .get()
        .then(snapshot => {
            // Clear the table body
            table.innerHTML = "";

            // Loop through each terminal document
            snapshot.forEach(doc => {
                const terminalData = doc.data();
                const terminalId = doc.id; // Use document ID as terminal ID

                // Create a new row in the table body
                const row = table.insertRow();

                // Add terminal ID to the first cell
                const cell1 = row.insertCell(0);
                cell1.textContent = terminalId;

                // Create a button for the second cell
                const cell2 = row.insertCell(1);
                const button = createTerminalButton(terminalId);
                cell2.appendChild(button);
            });
        })
        .catch(error => {
            console.error(`Error fetching ${type} terminals for station ${stationId}:`, error);
        });
}


// Function to fetch terminal IDs from Firestore
async function fetchTerminalsFromFirestore(stationId) {
    try {
        const snapshot = await firestore.collection("terminals").where("stationId", "==", stationId).get();
        const terminalIds = [];

        snapshot.forEach(doc => {
            const terminalData = doc.data();
            terminalIds.push(terminalData.terminalId);
        });

        return terminalIds;
    } catch (error) {
        console.error("Error fetching terminal IDs from Firestore:", error);
        return [];
    }
}

// Fetch and display AC terminals
fetchAndDisplayTerminals(stationId, "AC", acTerminalsTable);

// Fetch and display DC terminals
fetchAndDisplayTerminals(stationId, "DC", dcTerminalsTable);

// Example usage of fetching terminal IDs
fetchTerminalsFromFirestore(stationId)
    .then(terminalIds => {
        console.log("Terminal IDs:", terminalIds);
        // Do something with the terminal IDs, if needed
    });
