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

// Event listener for generating terminals
document.getElementById("generateButton").addEventListener("click", function (e) {
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

    // Initialize an array to store terminal data
    const terminalData = [];

    // Generate and display terminal IDs based on AC and DC terminals
    for (let i = 1; i <= acTerminals; i++) {
        const terminalId = `${stationId}CHAC${i.toString().padStart(3, "0")}`;
        displayTerminal(terminalId);
        terminalData.push({ terminalId, type: "AC" });
    }

    for (let i = 1; i <= dcTerminals; i++) {
        const terminalId = `${stationId}CHDC${i.toString().padStart(3, "0")}`;
        displayTerminal(terminalId);
        terminalData.push({ terminalId, type: "DC" });
    }

    // Store the terminal data in the database
    const stationRef = stationsRef.child(stationId);
    stationRef.child("terminals").set(terminalData);
});

// Event listener for submitting the form
document.getElementById("submitButton").addEventListener("click", function () {
    // Reload the page
    location.reload();
});

// Function to display a terminal
function displayTerminal(terminalId) {
    const terminalDiv = document.createElement("div");
    terminalDiv.textContent = `Terminal ID: ${terminalId}`;
    terminalsContainer.appendChild(terminalDiv);
}

// Initial call to set the initial visibility of amount fields
handleAdapterTypeChange();


// Add this code at the beginning of your JavaScript file
let terminalsGenerated = false; // Track if terminals have been generated

// Function to disable the Generate Terminals button
function disableGenerateButton() {
    const generateButton = document.getElementById("generateButton");
    generateButton.disabled = true;
    generateButton.textContent = "Terminals Generated";
}

// Add this code inside your terminalForm.addEventListener("submit", function (e) { ... });
terminalForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Check if terminals have been generated
    if (terminalsGenerated) {
        alert("Terminals are already generated. You can submit the form.");
        return;
    }

    // Your existing code to generate terminals

    // Set terminalsGenerated to true after generating terminals
    terminalsGenerated = true;

    // Disable the Generate Terminals button
    disableGenerateButton();

    // Your code to save the form data to Firebase
});


function viewTerminals() {
    const stationId = document.getElementById("stationIdHeader").textContent; // Get the station ID from the header
    window.location.href = `terminal.html?stationId=${stationId}`; // Navigate to the terminal page with the station ID as a query parameter
}


