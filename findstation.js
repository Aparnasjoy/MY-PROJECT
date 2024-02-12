// Initialize Firebase and authentication
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();
const vehiclesRef = db.ref("users");
const stationsRef = db.ref("station");

// Declare selectedStation globally
let selectedStation;
// Configure Razorpay
const razorpay = new Razorpay({
  key: 'rzp_test_HaKkOFpjivI4is', // Replace with your actual Razorpay key
  // Add other required configuration options
});

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

// Get the AC and DC buttons
const acButton = document.getElementById('acButton');
const dcButton = document.getElementById('dcButton');

// Attach event listeners to the AC and DC buttons
acButton.addEventListener('click', () => {
  displayTerminals(selectedStation, 'AC');
  initiatePayment(8000); // Pass the amount for AC
});

dcButton.addEventListener('click', () => {
  displayTerminals(selectedStation, 'DC');
  initiatePayment(10000); // Pass the amount for DC
});

// Function to display terminals for the selected station and type
function displayTerminals(selectedStation, type) {
  // Assuming you have a reference to the 'stations' node in the database
  const stationRef = db.ref(`stations/${selectedStation}/terminals`);

  // Fetch terminals from the database
  stationRef.once('value')
    .then(snapshot => {
      // Get the div where you want to display terminals
      const terminalsDiv = document.getElementById('terminalsDiv');

      // Clear existing content
      terminalsDiv.innerHTML = "";

      snapshot.forEach(terminalSnapshot => {
        const terminalData = terminalSnapshot.val();
        if (terminalData.type === type) {
          const option = document.createElement("p");
          option.textContent = terminalData.terminalId;
          terminalsDiv.appendChild(option);
        }
      });
    })
    .catch(error => {
      console.error("Error fetching terminals:", error);
    });
}

// Get the submit button element
const submitButton = document.getElementById('submitButton');

// Attach the event listener to the submit button
submitButton.addEventListener('click', () => {
  console.log('Button clicked!');

  const selectedVehicle = document.getElementById('vehicleDropdown').value;
  selectedStation = document.getElementById('stationDropdown').value;

  if (selectedVehicle && selectedStation) {
    // Create a charging history entry
    const chargingHistoryEntry = {
      vehicle: selectedVehicle,
      station: selectedStation,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    };

    // Store the charging history in the user's database node
    db.ref(`users/${auth.currentUser.uid}/chargingHistory`).push(chargingHistoryEntry)
      .then(() => {
        alert('Charging history stored successfully.');
        console.log('Displaying terminals for selected station');

        // Call the function to display terminals
        displayTerminals(selectedStation, 'AC'); // Assuming 'AC' is the default type
      })
      .catch((error) => {
        // Handle the error
        console.error('Error storing charging history:', error);
        alert('Error storing charging history. Please try again.');
      });
  } else {
    // Handle the case where the user hasn't selected both vehicle and station
    alert('Please select both vehicle and station before submitting.');
  }
});

// Event listener for the payment button
document.getElementById('paymentButton').addEventListener('click', function () {
  // Configure Razorpay options
  const options = {
    amount: 8000, // Default to AC amount
    currency: 'INR',
    receipt: 'order_receipt_123',
    payment_capture: '8',
  };

  // Open Razorpay payment modal
  razorpay.open(options);
});
