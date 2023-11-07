firebase.initializeApp(firebaseConfig);

var db = firebase.database();
const stationsRef = db.ref("station");

// Function to get the value of a query parameter from the URL
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Retrieve the stationId from the URL
const stationId = getQueryParam("stationId");

// Display the stationId in the header section
const stationIdHeader = document.getElementById("stationIdHeader");
stationIdHeader.textContent = stationId;

// Reference to the station data based on stationId
const stationDataRef = stationsRef.child(stationId);


const terminalForm = document.getElementById("terminalForm");
const acAdapter = document.getElementById("acAdapter");
const dcAdapter = document.getElementById("dcAdapter");
const acDcAdapter = document.getElementById("acDcAdapter");
const acAmountField = document.getElementById("acAmountField");
const dcAmountField = document.getElementById("dcAmountField");
const terminalsContainer = document.getElementById("terminalsContainer");

function handleAdapterTypeChange() {
    acAmountField.style.display = acAdapter.checked || acDcAdapter.checked ? "block" : "none";
    dcAmountField.style.display = dcAdapter.checked || acDcAdapter.checked ? "block" : "none";
}

// Add event listeners for adapter type radio buttons
acAdapter.addEventListener("change", handleAdapterTypeChange);
dcAdapter.addEventListener("change", handleAdapterTypeChange);
acDcAdapter.addEventListener("change", handleAdapterTypeChange);

terminalForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const totalTerminals = parseInt(document.getElementById("totalTerminals").value, 10);
    const acTerminals = parseInt(document.getElementById("acTerminals").value, 10);
    const dcTerminals = parseInt(document.getElementById("dcTerminals").value, 10);
    
    if (isNaN(totalTerminals) || isNaN(acTerminals) || isNaN(dcTerminals)) {
        alert("Please enter valid numbers for terminals.");
        return;
    }

    if (totalTerminals !== acTerminals + dcTerminals) {
        alert("Total terminal mismatch.");
        return;
    }

    // Get the station ID from the header
    const stationId = document.getElementById("stationIdHeader").textContent;

    // Clear previous terminals
    terminalsContainer.innerHTML = "";

    // Generate and display terminal IDs based on AC and DC terminals
    for (let i = 1; i <= acTerminals; i++) {
        const terminalId = `${stationId}CHAC${i.toString().padStart(3, "0")}`;
        displayTerminal(terminalId);
    }
    
    for (let i = 1; i <= dcTerminals; i++) {
        const terminalId = `${stationId}CHDC${i.toString().padStart(3, "0")}`;
        displayTerminal(terminalId);
    }
    
    // Save terminal data to Firebase (adjust the Firebase structure to match your database)
    const stationRef = stationsRef.child(stationId);
    stationRef.child("terminals").push().set({
        type: acAdapter.checked ? "AC" : dcAdapter.checked ? "DC" : "AC/DC",
        amount: acAdapter.checked ? acAmount : dcAdapter.checked ? dcAmount : null
    });
});

function displayTerminal(terminalId) {
    const terminalDiv = document.createElement("div");
    terminalDiv.innerHTML = `Terminal ID: ${terminalId}`;
    terminalsContainer.appendChild(terminalDiv);
}

// Initial call to set the initial visibility of amount fields
handleAdapterTypeChange();

// Select the submit button by its id
const submitButton = document.getElementById("submitButton");

// Add a click event listener to the submit button
submitButton.addEventListener("click", function() {
    // Reload the page
    location.reload();
});
