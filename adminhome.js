firebase.initializeApp(firebaseConfig);

var db = firebase.database();

// Initialize Firebase and get references to form fields

const nameField = document.getElementById("name");
const contactField = document.getElementById("contact");
//const managerIdField = document.getElementById("managerid");
const emailField = document.getElementById("email");
const passwordField = document.getElementById("password");
// Get reference to the registration form
const registrationForm = document.getElementById("registrationForm");

// Add an event listener to the registration form
registrationForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Validate form fields
  if (!validateForm()) {
    return;
  }

  // Get values from form fields
  const name = nameField.value;
  const contact = contactField.value;
  //const managerId = managerIdField.value;
  const email = emailField.value;
  const password = passwordField.value;

  // Perform Firebase registration here
  // Use the Firebase Authentication API to create a new user with email and password
   firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // User registered successfully
      const user = userCredential.user;

      user.sendEmailVerification()
        .then(() => {
          console.log("Verification email sent successfully.");
          alert("verification email sent successfully.")
        })
        .catch((error) => {
          console.error("Error sending verification email: ", error);
          alert("Error sending verification email")
        });

        
       


      // Create an object with the station manager data
      const managerData = {
        name: name,
        contact: contact,
        //managerId: managerId,
        email: email,
      };
      addStationManager(managerData);

      console.log("User registered successfully.");
      // Refresh the page to clear the form
      
    })
    .catch((error) => {
      console.error("Error creating user: ", error);
    });
});




// Validation functions...
// (Place the validateName, validateContact, etc., functions here)
function validateForm() {
  let isValid = true;

  if (nameField.value === "") {
    displayError("nameError", "Please enter a name.");
    isValid = false;
  } else {
    clearError("nameError");
  }

  if (contactField.value === "" || !/^\d+$/.test(contactField.value)) {
    displayError("contactError", "Please enter a valid contact number.");
    isValid = false;
  } else {
    clearError("contactError");
  }

  /*if (managerIdField.value === "" || !/^\d+$/.test(managerIdField.value)) {
    displayError("manageridError", "Please enter a manager ID.");
    isValid = false;
  } else {
    clearError("manageridError");
  }*/

  if (
    emailField.value === "" ||
    !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(emailField.value)
  ) {
    displayError("emailError", "Please enter a valid email address.");
    isValid = false;
  } else {
    clearError("emailError");
  }

  if (passwordField.value === "" || passwordField.value.length < 6) {
    displayError(
      "passwordError",
      "Password must be at least 6 characters."
    );
    isValid = false;
  } else {
    clearError("passwordError");
  }

  return isValid;
}

// Add input event listeners for real-time validation
nameField.addEventListener("input", validateName);
contactField.addEventListener("input", validateContact);
//managerIdField.addEventListener("input", validateManagerId);
emailField.addEventListener("input", validateEmail);
passwordField.addEventListener("input", validatePassword);

function validateName() {
  const fullName = nameField.value.trim();
  const nameError = document.getElementById("nameError");

  if (
    fullName.length > 25 ||
    fullName.length === 0 ||
    fullName.startsWith(" ") ||
    /  +/.test(fullName)
  ) {
    nameError.textContent =
      "invalid name";
    nameError.style.display = "block";
    return false;
  } else {
    nameError.textContent = "";
    nameError.style.display = "none";
    return true;
  }
}

function validateContact() {
  const contact = contactField.value.trim();
  const contactError = document.getElementById("contactError");

  if (!/^[6-9]\d{9}$/.test(contact)) {
    contactError.textContent = "Please enter valid phone number.";
    contactError.style.display = "block";
    return false;
  } else {
    contactError.textContent = "";
    contactError.style.display = "none";
    return true;
  }
}





function validateEmail() {
  const email = emailField.value.trim();
  const emailError = document.getElementById("emailError");

  // This regular expression pattern provides a more strict email validation
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailPattern.test(email)) {
    emailError.textContent = "Please enter a valid email address.";
    emailError.style.display = "block";
    return false;
  } else {
    emailError.textContent = "";
    emailError.style.display = "none";
    return true;
  }
}



function validatePassword() {
  const password = passwordField.value.trim();
  const passwordError = document.getElementById("passwordError");

  const passwordPattern = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{6}$/;

  if (!passwordPattern.test(password)) {
    passwordError.textContent = "Password must be 6 characters long and contain at least one special character.";
    passwordError.style.display = "block";
    return false;
  } else {
    passwordError.textContent = "";
    passwordError.style.display = "none";
    return true;
  }
}


// Rest of your code...
function displayError(errorId, errorMessage) {
  const errorElement = document.getElementById(errorId);
  errorElement.textContent = errorMessage;
  errorElement.style.display = "block";
}
function clearError(errorId) {
  const errorElement = document.getElementById(errorId);
  errorElement.textContent = "";
  errorElement.style.display = "none";
}



// AddStationManager function...
function addStationManager(managerData) {
  // Generate a unique key for the new station manager entry
  var newManagerKey = db.ref().child('station_managers').push().key;

  // Set the data in the Realtime Database using the generated key
  db.ref('station_managers/' + newManagerKey).set(managerData, function (error) {
    if (error) {
      console.error("Error adding station manager: " + error);
      alert("register failed. ");
    } else {
      console.log("Station manager added successfully.");
      alert("Station manager added successfully.");
    }
    location.reload();
  });
}
// Select the logout button element



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