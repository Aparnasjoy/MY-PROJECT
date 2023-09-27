
//import { firebaseConfig } from './firebase-config.js';



// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
// DOM elements
const adminLoginForm = document.getElementById("adminLoginForm");
//const signOutBtn = document.getElementById("signOutBtn");

// Add event listener to the login form
adminLoginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("Form submitted");
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log("Email:", email);
    console.log("Password:", password);
    
   // Authentication
   firebase.auth().signInWithEmailAndPassword(email,password)
.then((userCredential) => {
    // Admin logged in successfully
    const user = userCredential.user;
    console.log('Admin user logged in:', user.email);
//redirect to adminhome
    window.location.href = "adminhome.html";
})
.catch((error) => {
    console.error('Admin login failed:', error);
});
});