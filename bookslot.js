// Initialize Firebase and authentication
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();
const stationsRef = db.ref("station");

// Wait for the authentication state to change
auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    displayVehicles(user);
  } else {
    // No user is signed in
    console.log('No user is signed in.');
    // You might want to redirect the user to the login page or handle this case appropriately
  }
});

// Function to display vehicles in the dropdown
function displayVehicles(user) {
  const vehiclesRef = db.ref(`users/${user.uid}/vehicles`);

  vehiclesRef.once('value')
    .then((snapshot) => {
      const vehicleDropdown = document.getElementById('vehicleDropdown');

      snapshot.forEach((childSnapshot) => {
        const vehicleData = childSnapshot.val();
        const option = document.createElement('option');
        option.value = vehicleData.vehicleKey;
        option.textContent = `${vehicleData.brand} - ${vehicleData.type} (${vehicleData.number})`;
        vehicleDropdown.appendChild(option);
      });
    })
    .catch((error) => {
      console.error('Error fetching vehicles:', error);
    });
}

function populateStationsDropdown() {
  const stationDropdown = document.getElementById("stationDropdown");

  // Remove existing options
  stationDropdown.innerHTML = "";

  // Fetch stations from the database
stationsRef.once("value")
.then(snapshot => {
  const stationDropdown = document.getElementById("stationDropdown");

  snapshot.forEach(stationSnapshot => {
    const stationId = stationSnapshot.key;
    const stationData = stationSnapshot.val();

    // Create an option element with station information
    const option = document.createElement("option");
    option.value = stationId;
    option.textContent = `${stationData.stationName} - ${stationData.location} (ID: ${stationId})`;
    stationDropdown.appendChild(option);
  });
})
.catch(error => {
  console.error("Error fetching stations:", error);
});
}

// Function to fetch and display terminals for the selected station
function fetchTerminals() {
// Get the selected stationId from the dropdown
const selectedStationId = document.getElementById("stationDropdown").value;

// Reference to the terminals for the selected station
const terminalsRef = stationsRef.child(selectedStationId).child("terminals");

// Fetch terminals data
terminalsRef.once("value")
  .then(snapshot => {
    const terminalsContainer = document.getElementById("terminalsContainer");
    terminalsContainer.innerHTML = ""; // Clear previous terminals

    snapshot.forEach(terminalSnapshot => {
      const terminalData = terminalSnapshot.val();
      const terminalDiv = document.createElement("div");
      terminalDiv.textContent = `Terminal ID: ${terminalSnapshot.key}, Type: ${terminalData.type}`;
      terminalsContainer.appendChild(terminalDiv);
    });
  })
  .catch(error => {
    console.error("Error fetching terminals:", error);
  });
}
