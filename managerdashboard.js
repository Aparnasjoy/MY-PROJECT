firebase.initializeApp(firebaseConfig);
var db = firebase.database();

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
      // User is signed in, update the session info
      const currentUserEmail = document.getElementById("currentUserEmail");
      currentUserEmail.textContent = `User: ${user.email}`;
  } else {
      // User is not signed in, handle as needed (e.g., redirect to the login page)
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

// Prevent going back after logout
window.addEventListener("pageshow", function (event) {
    // If the page was shown through the back button, redirect to index.html
    if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
      window.location.href = "index.html";
    }
  });

  const viewDashboardButton = document.getElementById("view");

            // Add a click event listener to the button
            viewDashboardButton.addEventListener("click", function () {
                // Redirect to the existing admindashboard.html page
                window.location.href = "admin-dashboard.html";
            });
