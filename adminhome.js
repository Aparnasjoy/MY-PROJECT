firebase.initializeApp(firebaseConfig);

// Get a reference to the Realtime Database
var db = firebase.database();

// Get references to form fields
const nameField = document.getElementById("name");
const contactField = document.getElementById("contact");
const managerIdField = document.getElementById("managerid");
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
  const managerId = managerIdField.value;
  const email = emailField.value;
  const password = passwordField.value;

  // Perform Firebase registration here
  // Use the Firebase Authentication API to create a new user with email and password
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // User registered successfully
      const user = userCredential.user;
      
      // Create an object with the station manager data
      const managerData = {
        name: name,
        contact: contact,
        managerId: managerId,
        email: email,
      };

      // Call the function to add a new station manager to the Realtime Database
      addStationManager(managerData);

      console.log("User registered successfully.");
      // Redirect or perform any other actions here
    })
    .catch((error) => {
      console.error("Error creating user: ", error);
    });
});
function validateForm() {
    let isValid = true;

    if (nameField.value === "") {
        displayError("nameError", "Please enter a name.");
        isValid = false;
    } else {
        clearError("nameError");
    }

    if (contactField.value === "" || !/^[0-9]+$/.test(contactField.value)) {
        displayError("contactError", "Please enter a valid contact number.");
        isValid = false;
    } else {
        clearError("contactError");
    }

    if (managerIdField.value === "") {
        displayError("manageridError", "Please enter a manager ID.");
        isValid = false;
    } else {
        clearError("manageridError");
    }

    if (emailField.value === "" || !isValidEmail(emailField.value)) {
        displayError("emailError", "Please enter a valid email address.");
        isValid = false;
    } else {
        clearError("emailError");
    }

    if (passwordField.value === "" || passwordField.value.length < 8) {
        displayError("passwordError", "Password must be at least 8 characters.");
        isValid = false;
    } else {
        clearError("passwordError");
    }

    return isValid;
}

function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
}

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

function addStationManager(managerData) {
    // Generate a unique key for the new station manager entry
    var newManagerKey = db.ref().child('station_managers').push().key;
  
    // Set the data in the Realtime Database using the generated key
    db.ref('station_managers/' + newManagerKey).set(managerData, function (error) {
      if (error) {
        console.error("Error adding station manager: " + error);
      } else {
        console.log("Station manager added successfully.");
      }
    });
  }
