// Update the displayRegisteredUsers function to populate the status and action cells
firebase.initializeApp(firebaseConfig);

const db = firebase.database();

function displayRegisteredUsers() {
    const usersRef = db.ref("station_managers");

    usersRef.once("value")
        .then((snapshot) => {
            const users = [];
            snapshot.forEach((childSnapshot) => {
                const userData = childSnapshot.val();
                users.push(userData);
            });
            populateUserTable(users);
        })
        .catch((error) => {
            console.error("Error fetching registered users: ", error);
        });
}

// Modify the populateUserTable function to include Enable and Disable buttons
function populateUserTable(users) {
    const userList = document.getElementById("userList");
    userList.innerHTML = ""; // Clear previous data

    users.forEach((user) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.status}</td>
            <td>
                <button class="enableButton" data-email="${user.email}">Enable</button>
                <button class="disableButton" data-email="${user.email}">Disable</button>
            </td>
        `;

        // Add event listeners for Enable and Disable buttons
        const enableButton = row.querySelector(".enableButton");
        enableButton.addEventListener("click", () => {
            updateUserStatus(user.email, "Enabled");
        });

        const disableButton = row.querySelector(".disableButton");
        disableButton.addEventListener("click", () => {
            updateUserStatus(user.email, "Disabled");
        });

        userList.appendChild(row);
    });
}

// Function to update the status in Firebase
function updateUserStatus(email, status) {
    const usersRef = db.ref("station_managers");

    usersRef.once("value")
        .then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const userData = childSnapshot.val();
                if (userData.email === email) {
                    userData.status = status;
                    childSnapshot.ref.update(userData);
                }
            });
        })
        .catch((error) => {
            console.error("Error updating user status: ", error);
        });
}

// Call the function to display registered users when the page loads
window.addEventListener("load", displayRegisteredUsers);

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
