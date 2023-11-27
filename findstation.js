// Assuming you have a Firebase configuration in firebase-config.js
// Initialize the Firebase app with your configuration
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.database();
const vehiclesRef = db.ref("users");
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

function displayVehicles(user) {
  // Create a reference to the 'vehicles' node in the database
  const vehiclesRef = db.ref(`users/${user.uid}/vehicles`);

  // Fetch and display vehicles
  vehiclesRef.once('value')
    .then((snapshot) => {
      const vehicleDropdown = document.getElementById('vehicleDropdown');

      snapshot.forEach((childSnapshot) => {
        const vehicleData = childSnapshot.val();
        // Add each vehicle as an option in the dropdown
        const option = document.createElement('option');
        option.value = vehicleData.vehicleKey; // Use a unique identifier as the value
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
      snapshot.forEach(stationSnapshot => {
        const stationName = stationSnapshot.child("stationName").val();
        const option = document.createElement("option");
        option.value = stationName;
        option.textContent = stationName;
        stationDropdown.appendChild(option);
      });
    })
    .catch(error => {
      console.error("Error fetching stations:", error);
    });
}

// Call the function to populate stations on page load
populateStationsDropdown();

// Get the submit button element
const submitButton = document.getElementById('submitButton');

// Attach the event listener to the submit button
submitButton.addEventListener('click', () => {
  console.log('Button clicked!');

  const selectedVehicle = document.getElementById('vehicleDropdown').value;
  const selectedStation = document.getElementById('stationDropdown').value;

  if (selectedVehicle && selectedStation) {
    // ... (rest of your code)

    db.ref(`users/${auth.currentUser.uid}/chargingHistory`).push(chargingHistoryEntry)
      .then(() => {
        alert('Charging history stored successfully.');
        console.log('Navigation to selectterminal.html');
        // Navigate to the selectterminal page
        window.location.href = 'selectterminal.html';
      })
      .catch((error) => {
        // ... (rest of your error handling code)
      });
  } else {
    // ... (rest of your else code)
  }
});
