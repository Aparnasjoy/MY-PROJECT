

//import { firebaseConfig } from './firebase-config.js';



// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
// DOM elements
const adminLoginForm = document.getElementById("adminLoginForm");
//const signOutBtn = document.getElementById("signOutBtn"); new
const successMessage = document.getElementById("successMessage");
const emailField = document.getElementById("email");
const emailError = document.getElementById("emailError");
const passwordField = document.getElementById("password");
const passwordError = document.getElementById("passwordError");

// Email format validation function
function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
}

// Add event listeners for email and password fields
emailField.addEventListener("input", function () {
    const email = emailField.value;
    if (!isValidEmail(email)) {
        emailError.textContent = "Please enter a valid email address.";
    } else {
        emailError.textContent = "";
    }
});





// Add event listener to the login form
adminLoginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    const user = userCredential.user;

    // Check if the user is the admin
    if (user.email === "aparnasjoy2024a@mca.ajce.in") {
      console.log('Admin user logged in:', user.email);
      alert(" Logged in successfully.");
      // Redirect to adminhome for the admin
      window.location.href = "adminhome.html";
    } else {
      // Redirect non-admin users to the station page
      alert("Station Manager loggedin successfully.");
      window.location.href = "station.html";
    }
  })
  .catch((error) => {
    console.error('Login failed:', error);
    alert("Login failed. Please check your email and password.");
  });
  successMessage.style.display = "block";
});
