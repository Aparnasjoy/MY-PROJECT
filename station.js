// Initialize Firebase with your configuration (similar to adminhome.js)
// ...
firebase.initializeApp(firebaseConfig);

var db = firebase.database();
const stationsRef = db.ref("station");

// Check user authentication status
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in, update the session info
        const currentUserEmail = document.getElementById("currentUserEmail");
        currentUserEmail.textContent = `User: ${user.email}`;
    } else {
        // User is not signed in, handle as needed (e.g., redirect to login page)
    }
});

// Handle the logout button click event


const logoutButton = document.getElementById("logoutButton");

// Add a click event listener to the logout button
logoutButton.addEventListener("click", () => {
  // Sign out the user from Firebase
  firebase.auth().signOut().then(() => {
    // Use window.location to navigate to the index.html page
    window.location.href = "index.html";
  }).catch((error) => {
    console.error("Error signing out: ", error);
  });
});

// Prevent going back after logout
window.addEventListener("pageshow", function (event) {
    // If the page was shown through the back button, redirect to index.html
    if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
      window.location.href = "index.html";
    }
  });
  const stationForm = document.getElementById("stationForm");
const acAdapter = document.getElementById("acAdapter");
const dcAdapter = document.getElementById("dcAdapter");
const acDcAdapter = document.getElementById("acDcAdapter");
const acAmountField = document.getElementById("acAmountField");
const dcAmountField = document.getElementById("dcAmountField");

function handleAdapterTypeChange() {
    acAmountField.style.display = acAdapter.checked || acDcAdapter.checked ? "block" : "none";
    dcAmountField.style.display = dcAdapter.checked || acDcAdapter.checked ? "block" : "none";
}

// Add event listeners for adapter type radio buttons
acAdapter.addEventListener("change", handleAdapterTypeChange);
dcAdapter.addEventListener("change", handleAdapterTypeChange);
acDcAdapter.addEventListener("change", handleAdapterTypeChange);

stationForm.addEventListener("submit", function(e) {
    e.preventDefault();

    // Get form data
    const stationId = document.getElementById("stationId").value;
    const stationName = document.getElementById("stationName").value;
    const location = document.getElementById("location").value;
    const totalTerminals = parseInt(document.getElementById("totalTerminals").value, 10);
    const acTerminals = parseInt(document.getElementById("acTerminals").value, 10);
    const dcTerminals = parseInt(document.getElementById("dcTerminals").value, 10);
    const adapterTypeValue = document.querySelector('input[name="adapterType"]:checked').value;
    const acAmount = parseFloat(document.getElementById("acAmount").value) || null;
    const dcAmount = parseFloat(document.getElementById("dcAmount").value) || null;

    // Add strong validations
    if (!/^SID\d{4}$/.test(stationId)) {
        alert("Station ID must start with 'SID' followed by 4 digits.");
        return;
    }
    if (!/^[A-Za-z\s]+$/.test(stationName)) {
        alert("Station Name incorrect");
        return;
    }
    if (!/^[A-Za-z0-9\s]+$/.test(location)) {
        alert("Location incorrect");
        return;
    }

    // Validate the total number of terminals
    if (totalTerminals !== acTerminals + dcTerminals) {
        alert("total terminal mismatch.");
        return;
    }

    // Get the currently logged-in user's email (manager's email)
    const user = firebase.auth().currentUser;
    if (user) {
        const managerId = user.email;

        // Create an object to represent the station data including the manager's email
        const stationData = {
            stationId: stationId,
            stationName: stationName,
            location: location,
            totalTerminals: totalTerminals,
            acTerminals: acTerminals,
            dcTerminals: dcTerminals,
            adapterType: adapterTypeValue,
            acAmount: acAmount,
            dcAmount: dcAmount,
            managerId: managerId,
        };

        // Push the station data to the "stations" node in your database
        const newStationRef = stationsRef.push();
        newStationRef.set(stationData)
            .then(() => {
                console.log("Data saved to Firebase:", stationData);
                // Clear the form or perform any other actions you need
                stationForm.reset();
            })
            .catch((error) => {
                console.error("Error saving data:", error);
            });
    }
});

// Initial call to set initial visibility of amount fields
handleAdapterTypeChange();

function redirectToUpdateStation() {
    // Redirect to the updatestation.html page
    window.location.href = "updatestation.html";
}