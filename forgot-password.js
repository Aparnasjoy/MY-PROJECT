firebase.initializeApp(firebaseConfig);

var db = firebase.database();

const auth = firebase.auth();

// Get references to HTML elements
const resetPasswordForm = document.getElementById("resetPasswordForm");

// Add an event listener to the form
resetPasswordForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Get the user's email from the form
    const email = document.getElementById("email").value;

    // Send a password reset email
    auth.sendPasswordResetEmail(email)
        .then(() => {
            // Password reset email sent successfully
            alert("Password reset email sent. Check your inbox!");
            // Redirect to a login page or home page
            //window.location.href = "login.html";
        })
        .catch((error) => {
            // Handle any errors (e.g., invalid email)
            alert("Error sending password reset email: " + error.message);
        });
       
});

