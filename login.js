firebase.initializeApp(firebaseConfig);
var db = firebase.database();
const adminLoginForm = document.getElementById("adminLoginForm");
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
                alert("Logged in successfully.");
                // Redirect to adminhome for the admin
                window.location.href = "dashboard.html";
            } else {
              const managersRef = db.ref("station_managers");
              managersRef.orderByChild("email").equalTo(user.email).once("value")
                .then((snapshot) => {
                  if (snapshot.exists()) {
                    console.log('Station manager logged in:', user.email);
                    alert("Station Manager logged in successfully.");
                    // Redirect to station manager page
                    window.location.href = "managerdashboard.html";
                  } else {
                    console.log('User logged in:', user.email);
                    alert("User logged in successfully.");
                    // Redirect to user page
                    window.location.href = "chargehub.html";
                  }
                })
                    .catch((error) => {
                        console.error('Error getting documents:', error);
                        alert("Login failed. Please check your email and passwordd.");
                    });
            }
        })
        .catch((error) => {
            console.error('Login failed:', error);
            alert("Login failed. Please check your email and password.");
        });
    successMessage.style.display = "block";
});
