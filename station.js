// Initialize Firebase with your configuration (similar to adminhome.js)
// ...
firebase.initializeApp(firebaseConfig);

var db = firebase.database();
const stationsRef = db.ref("station");

// Reference to the station ID counter
const stationIdCounterRef = db.ref("stationIdCounter");

// Automatically generate the next station ID when the page loads
window.addEventListener('load', function () {
    const stationIdField = document.getElementById("stationId");

    // Get the current station ID counter value and use it as the next station ID
    stationIdCounterRef.transaction(function (currentCounter) {
        // Initialize the counter to 1000 if it doesn't exist
        if (currentCounter === null) {
            return 1000;
        }
        // Increment the counter by 1
        return currentCounter + 1;
    }, function (error, committed, snapshot) {
        if (error) {
            console.error("Transaction failed abnormally!", error);
        } else if (committed) {
            // Successfully incremented the counter
            stationIdField.value = "SID" + snapshot.val().toString().padStart(4, '0');
        } else {
            console.error("Transaction was not committed.");
        }
    });
});

// Check user authentication status
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in, update the session info
        const currentUserEmail = document.getElementById("currentUserEmail");
        currentUserEmail.textContent = `User: ${user.email}`;
    } else {
        // User is not signed in, handle as needed (e.g., redirect to the login page)
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

// ... (previous code)

const stationForm = document.getElementById("stationForm");

stationForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const stationIdField = document.getElementById("stationId");
    const stationName = document.getElementById("stationName").value;
    const location = document.getElementById("location").value;
    const latitude = document.getElementById("latitude").value; // Add this line
    const longitude = document.getElementById("longitude").value; // Add this line

    // Get the currently logged-in user's email (manager's email)
    const user = firebase.auth().currentUser;
    if (user) {
        const managerId = user.email;

        // Create an object to represent the station data
        const stationData = {
            stationId: stationIdField.value,
            stationName: stationName,
            location: location,
            latitude: latitude, // Add this line
            longitude: longitude, // Add this line
            managerId: managerId,
        };

        // Push the station data to the "stations" node in your database
        const newStationRef = stationsRef.push();
        newStationRef.set(stationData)
            .then(() => {
                console.log("Data saved to Firebase:", stationData);
                alert("Station data saved successfully");
                // Clear the form or perform any other actions you need
                stationForm.reset();

                // Reload the page to get the updated station ID
            })
            .catch((error) => {
                console.error("Error saving data:", error);
                alert("An error occurred while saving station data.");
            });

    }
    // Increment the station ID counter for the next entry
    stationIdCounterRef.transaction(function (currentCounter) {
        return currentCounter + 1;
    });
});

// ... (remaining code)


function redirectToUpdateStation() {
    // Redirect to the updatestation.html page
    window.location.href = "updatestation.html";
}
