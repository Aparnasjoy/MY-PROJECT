firebase.initializeApp(firebaseConfig);

var db = firebase.database();

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in, update the session info
        const currentUserInfo = document.getElementById("currentUserInfo");

        // Fetch additional user data from the Realtime Database
        db.ref("users/" + user.uid).once('value').then((snapshot) => {
            const userData = snapshot.val();
            if (userData && userData.name) {
                currentUserInfo.textContent = `User: ${userData.name}`;
            } else {
                currentUserInfo.textContent = `User: ${user.email}`;
            }
        });
    }
});

const logoutButton = document.getElementById("logoutBtn");

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

