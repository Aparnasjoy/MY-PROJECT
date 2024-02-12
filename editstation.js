// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize the counters collection reference
const firestore = firebase.firestore(); // Initialize Firestore
const countersCollection = firestore.collection("counters");


// Retrieve the stationId from the URL
const stationId = getQueryParam("stationId");
console.log("Station ID:", stationId); // Logging stationId

// Display the stationId in the header section
const stationIdHeader = document.getElementById("stationIdHeader");
stationIdHeader.textContent = stationId;
console.log("Station ID in header:", stationIdHeader.textContent);
// Set to store generated terminal IDs
const generatedTerminals = new Set();

// Function to get or create a counter for a specific stationId
async function getOrCreateCounter(stationId) {
    const counterDoc = countersCollection.doc(stationId);
    const counterSnapshot = await counterDoc.get();

    if (!counterSnapshot.exists) {
        // If the counter document doesn't exist, create it with an initial value of 1
        await counterDoc.set({ value: 1 });
        console.log("Counter document created for station ID:", stationId); // Logging counter creation
    }
}

// Event listener for generating terminals
document.getElementById("generateButton").addEventListener("click", async function (e) {
    e.preventDefault();

    const acTerminals = parseInt(document.getElementById("acTerminals").value, 10);
    const dcTerminals = parseInt(document.getElementById("dcTerminals").value, 10);

    if (isNaN(acTerminals) || isNaN(dcTerminals) || acTerminals < 1 || dcTerminals < 1) {
        alert("Please enter valid numbers for AC and DC terminals.");
        return;
    }

    // Retrieve the stationId from the URL
    const stationId = getQueryParam("stationId");
    console.log("Station ID (Generate Button Click):", stationId); // Logging stationId when generate button is clicked
    if (!stationId) {
        alert("Station ID not found in URL.");
        return;
    }

    // Clear previous terminals
    document.getElementById("terminalsContainer").innerHTML = "";
    console.log("Previous terminals cleared."); // Logging terminal clearing
    // Reset the set for generated terminals
    generatedTerminals.clear();
    console.log("Generated terminals set cleared."); // Logging generated terminals clearing

    // Generate and display terminal IDs based on AC and DC terminals
    for (let i = 1; i <= acTerminals; i++) {
        await generateUniqueTerminal(stationId, "AC");
    }

    for (let i = 1; i <= dcTerminals; i++) {
        await generateUniqueTerminal(stationId, "DC");
    }
});

// Function to display and validate a terminal
function displayAndValidateTerminal(terminalId) {
    // Check if the generated terminalId already exists
    if (generatedTerminals.has(terminalId)) {
        alert(`Terminal ID ${terminalId} already exists. Please regenerate terminals.`);
        return false;
    }

    // Add the terminalId to the set
    generatedTerminals.add(terminalId);

    // Display the terminal
    const terminalDiv = document.createElement("div");
    terminalDiv.textContent = `Terminal ID: ${terminalId}`;
    document.getElementById("terminalsContainer").appendChild(terminalDiv);
    console.log("Terminal displayed:", terminalId); // Logging displayed terminal

    return true;
}



async function generateUniqueTerminal(stationId, type) {
    // Get or create the counter for the specific station
    await getOrCreateCounter(stationId);

    // Get the current value of the counter
    const counterSnapshot = await countersCollection.doc(stationId).get();
    const counterValue = counterSnapshot.data().value;

    console.log("Current counter value:", counterValue);

    // Check if the counter value exceeds the limit (e.g., 10 terminals)
    if (counterValue > 10) {
        alert("Terminal limit reached for this station.");
        return;
    }

    // Generate the terminal ID using the stationId, type, and counter value
    const terminalId = `${stationId}CH${type}${counterValue.toString().padStart(3, "0")}`;

    console.log("Generated terminal ID:", terminalId);

    // Check if the generated terminalId is unique
    if (displayAndValidateTerminal(terminalId)) {
        // Increment the counter value and update the counter document
        await countersCollection.doc(stationId).update({ value: counterValue + 1 });
        console.log("Counter updated successfully.");
    } else {
        // Regenerate the terminal ID if not unique
        await generateUniqueTerminal(stationId, type);
        console.log("Regenerating terminal ID...");
    }
}



// Function to save terminal details in Firestore and Realtime Database
async function saveTerminals(acTerminals, dcTerminals) {
    const terminalData = [];

    // Retrieve the stationId from the URL
    const stationId = getQueryParam("stationId");
    if (!stationId) {
        alert("Station ID not found in URL.");
        return;
    }

    // Generate and store terminal details
    for (let i = 1; i <= acTerminals; i++) {
        const terminalId = `${stationId}CHAC${i.toString().padStart(3, "0")}`;
        terminalData.push({ terminalId, type: "AC" });
    }

    for (let i = 1; i <= dcTerminals; i++) {
        const terminalId = `${stationId}CHDC${i.toString().padStart(3, "0")}`;
        terminalData.push({ terminalId, type: "DC" });
    }

    // Store terminal details in Firestore
    const terminalsCollection = firestore.collection("terminals");

    const firestorePromises = terminalData.map(async (terminal) => {
        try {
            await terminalsCollection.doc(terminal.terminalId).set({
                stationId,
                type: terminal.type
            });
            console.log(`Firestore: Terminal ${terminal.terminalId} saved successfully.`);
        } catch (error) {
            console.error(`Firestore: Error saving terminal ${terminal.terminalId}:`, error);
        }
    });

    // Store terminal details in Realtime Database
    const terminalsRef = firebase.database().ref(`terminals/${stationId}`);
    terminalData.forEach((terminal) => {
        terminalsRef.child(terminal.terminalId).set({
            type: terminal.type
        });
    });

    // Provide user feedback
    Promise.all(firestorePromises)
        .then(() => {
            alert("Terminal details saved successfully!");
            location.reload();
        })
        .catch((error) => {
            console.error("Error saving terminal details:", error);
            alert("Error saving terminal details. Please try again.");
        });
}

// Function to get the value of a query parameter from the URL
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Rest of your code...

// Add this code inside your terminalForm.addEventListener("submit", function (e) { ... });
function viewTerminals() {
    const stationId = getQueryParam("stationId");
    if (stationId) {
        window.location.href = `terminal.html?stationId=${stationId}`;
    } else {
        alert("Station ID not found in URL.");
    }
}

// Function to handle the form submission
document.getElementById("terminalForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const acTerminals = parseInt(document.getElementById("acTerminals").value, 10);
    const dcTerminals = parseInt(document.getElementById("dcTerminals").value, 10);

    // Save terminal details
    await saveTerminals(acTerminals, dcTerminals);

   

    // Reload the page
    location.reload();
});

// Function to save terminal details in Firestore and Realtime Database
async function saveTerminals(acTerminals, dcTerminals) {
    // Retrieve the stationId from the URL
    const stationId = getQueryParam("stationId");
    if (!stationId) {
        alert("Station ID not found in URL.");
        return;
    }

    // Reference to the terminals node for the current station ID in Realtime Database
    const terminalsRef = firebase.database().ref(`terminals/${stationId}`);

    // Firestore batch write operation
    const batch = firestore.batch();

    // Save terminal details
    for (let i = 1; i <= acTerminals; i++) {
        const terminalId = `${stationId}CHAC${i.toString().padStart(3, "0")}`;
        const terminalData = {
            stationId,
            type: "AC"
        };

        // Add terminal data to Firestore batch
        const terminalDocRef = firestore.collection("terminals").doc(terminalId);
        batch.set(terminalDocRef, terminalData);

        // Save terminal data to Realtime Database
        await terminalsRef.child(terminalId).set({
            type: "AC"
        });
    }

    for (let i = 1; i <= dcTerminals; i++) {
        const terminalId = `${stationId}CHDC${i.toString().padStart(3, "0")}`;
        const terminalData = {
            stationId,
            type: "DC"
        };

        // Add terminal data to Firestore batch
        const terminalDocRef = firestore.collection("terminals").doc(terminalId);
        batch.set(terminalDocRef, terminalData);

        // Save terminal data to Realtime Database
        await terminalsRef.child(terminalId).set({
            type: "DC"
        });
    }

    // Commit the batch write operation in Firestore
    await batch.commit();

    // Provide user feedback
    alert("Terminal details saved successfully!");
    location.reload();
}
