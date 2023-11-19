firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
var db = firebase.database();
const stationsRef = firebase.database().ref("station");

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

// Add an event listener to the form for handling submission
const selectVehicleForm = document.getElementById('selectVehicleForm');
selectVehicleForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the default form submission
  const selectedVehicleKey = document.getElementById('vehicleDropdown').value;
  // Handle the selected vehicle key as needed
  console.log('Selected Vehicle Key:', selectedVehicleKey);
});

function initFindStation() {
    // Get the station ID from the query parameter
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const stationId = urlParams.get('stationId');
  
    console.log('Station ID:', stationId);
  
    console.log('Fetching station details for stationId:', stationId);
  
    // Fetch and display station details
    stationsRef.child(stationId).once('value')
      .then((snapshot) => {
        console.log('Snapshot:', snapshot.val()); // Log the snapshot data
        const stationData = snapshot.val();
        if (stationData) {
          // Update the content dynamically
          const stationDetailsContainer = document.getElementById('selectedStationDetails');
          const stationNameElement = document.getElementById('stationName');
          const stationLocationElement = document.getElementById('Location');
  
          // Adjust the path to match your database structure
          stationNameElement.textContent = stationData.stationName;
          stationLocationElement.textContent = stationData.location;
  
          // Show the details container
          stationDetailsContainer.style.display = 'block';
        } else {
          // Hide the details container if no station is found
          const stationDetailsContainer = document.getElementById('selectedStationDetails');
          stationDetailsContainer.style.display = 'none';
        }
      })
      .catch((error) => {
        console.error('Error fetching station details:', error);
        // Hide the details container on error
        const stationDetailsContainer = document.getElementById('selectedStationDetails');
        stationDetailsContainer.style.display = 'none';
      });
  }

// Call initFindStation when the DOM is loaded
document.addEventListener('DOMContentLoaded', initFindStation);
