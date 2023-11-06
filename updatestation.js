// Initialize Firebase with your configuration
firebase.initializeApp(firebaseConfig);

var db = firebase.database();
const stationsRef = db.ref("station");

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in, update the session info
        const currentUserEmail = document.getElementById("currentUserEmail");
        currentUserEmail.textContent = `User: ${user.email}`;
        
        // Load all stations for the currently logged-in user (station manager)
        loadStations();
    } else {
        // User is not signed in, handle as needed (e.g., redirect to login page)
        console.error("User is not signed in.");
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

function loadStations() {
    const stationsContainer = document.getElementById("stationsContainer");

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            const currentUserEmail = user.email; // Get the current user's email
            stationsRef.on("value", (snapshot) => {
                stationsContainer.innerHTML = ""; // Clear the previous data

                snapshot.forEach(function(childSnapshot) {
                    const station = childSnapshot.val();
                    
                    if (station.managerId === currentUserEmail) {
                        // Only display stations where managerId matches the current user's email
                        // Create a new table for each station
                        const table = document.createElement("table");
                        table.classList.add("station-table");

                        // Create table rows
                        const row1 = table.insertRow(0);
                        const cell1 = row1.insertCell(0);
                        cell1.innerHTML = "Station ID";
                        const cell2 = row1.insertCell(1);
                        cell2.innerHTML = station.stationId;

                        const row2 = table.insertRow(1);
                        const cell3 = row2.insertCell(0);
                        cell3.innerHTML = "Station Name";
                        const cell4 = row2.insertCell(1);
                        cell4.innerHTML = station.stationName;

                        const row3 = table.insertRow(2);
                        const cell5 = row3.insertCell(0);
                        cell5.innerHTML = "Location";
                        const cell6 = row3.insertCell(1);
                        cell6.innerHTML = station.location;

                        // Create an edit button
                        const editButton = document.createElement("button");
                        editButton.innerText = "Edit";
                        editButton.addEventListener("click", () => {
                            window.location.href = `editstation.html?stationId=${station.stationId}`;
                            // Handle edit station functionality, e.g., redirect to edit page
                            // You can pass the station ID to the edit page for editing
                            // window.location.href = `editstation.html?stationId=${station.stationId}`;
                        });

                        // Append the edit button to the table
                        const row4 = table.insertRow(3);
                        const cell7 = row4.insertCell(0);
                        cell7.appendChild(editButton);

                        // Append the table to the container
                        stationsContainer.appendChild(table);
                    }
                });
            }, (error) => {
                console.error("Error loading stations: ", error);
            });
        } else {
            console.error("User is not signed in.");
        }
    });
}
