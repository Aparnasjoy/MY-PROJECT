// Initialize Firebase with your configuration (similar to adminhome.js)
// ...
firebase.initializeApp(firebaseConfig);

var db = firebase.database();

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
logoutButton.addEventListener("click", function() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful, redirect to index.html or your desired page
        window.location.href = "index.html";
    }).catch(function(error) {
        // An error happened, handle as needed
        console.error("Logout error: ", error);
    });
});

// Add your code to interact with the station form and perform other functionalities as needed
// ...
// Add this code at the end of your script
window.addEventListener("popstate", function (e) {
    // This prevents navigating back
    history.pushState(null, document.title, window.location.href);
    
    // This prevents navigating forward
    history.forward();
  });
  
