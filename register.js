firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
var db = firebase.database();

const form = document.getElementById("signup-form");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const rePasswordInput = document.getElementById("re_password");
const mobileNumberInput = document.getElementById("mobile_number");
const genderInputs = document.querySelectorAll("input[name='gender']");
//const agreeTermInput = document.getElementById("agree-term");

nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
passwordInput.addEventListener("input", validatePassword);
rePasswordInput.addEventListener("input", validateRetypePassword);
mobileNumberInput.addEventListener("input", validateMobileNumber);
genderInputs.forEach((genderInput) => {
  genderInput.addEventListener("change", validateGender);
});
//agreeTermInput.addEventListener("change", validateAgreeTerm);

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent the default form submission

  if (!validateForm()) {
    return; // Don't proceed with registration if there are validation errors
  }

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const mobile_number = mobileNumberInput.value.trim();
  const gender = document.querySelector("input[name='gender']:checked");
  
  // Create a new user with email and password
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // User created successfully
      const user = userCredential.user;

      // Store additional user data in Firebase Realtime Database
      db.ref("users/" + user.uid).set({
        name: name,
        email: email,
        mobile_number: mobile_number,
        gender: gender ? gender.value : "Other",
      });

      alert("Registration successful!");
      resetForm();
      // You can redirect the user or perform other actions here
    })
    .catch((error) => {
      // Handle errors (e.g., display an error message)
      const errorMessage = error.message;
      alert(errorMessage);
    });
   
});

function validateName() {
  const name = nameInput.value.trim();
  const lettersAndSpacesRegex = /^[a-zA-Z\s]+$/; // This regex allows alphabets and spaces

  if (name === "") {
    showError(nameInput, "Please enter your name.");
  } else if (!lettersAndSpacesRegex.test(name)) {
    showError(nameInput, "Name should contain only alphabets and spaces.");
  } else {
    clearError(nameInput);
  }
}


function validateEmail() {
  const email = emailInput.value.trim();
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (email === "") {
    showError(emailInput, "Please enter your email.");
  } else if (!emailRegex.test(email)) {
    showError(emailInput, "Please enter a valid email address.");
  } else {
    clearError(emailInput);
  }
}


function validatePassword() {
  // Validation logic for password
  const password = passwordInput.value.trim();
  if (password === "") {
    showError(passwordInput, "Please enter a password.");
  } else if (password.length < 6) {
    showError(passwordInput, "Password must be at least 6 characters.");
  } else {
    clearError(passwordInput);
  }
}

function validateRetypePassword() {
  // Validation logic for retype password
  const password = passwordInput.value.trim();
  const rePassword = rePasswordInput.value.trim();

  if (rePassword === "") {
    showError(rePasswordInput, "Please retype your password.");
  } else if (rePassword !== password) {
    showError(rePasswordInput, "Passwords do not match.");
  } else {
    clearError(rePasswordInput);
  }
}


function validateMobileNumber() {
  const mobileNumber = mobileNumberInput.value.trim();
  const mobileNumberRegex = /^[6-9]\d{9}$/;

  if (mobileNumber === "") {
    showError(mobileNumberInput, "Please enter your mobile number.");
  } else if (!mobileNumberRegex.test(mobileNumber)) {
    showError(mobileNumberInput, "Please enter a valid Indian mobile number.");
  } else {
    clearError(mobileNumberInput);
  }
}


function validateGender() {
  // Validation logic for gender
  if (!Array.from(genderInputs).some((input) => input.checked)) {
      showError(genderInputs[0], "Please select your gender.");
    } else {
      clearError(genderInputs[0]);
    }
}


function validateForm() {
  // Validation logic for the entire form
  validateName();
  validateEmail();
  validatePassword();
  validateMobileNumber();
  validateGender();
  //validateAgreeTerm();

  const errorMessages = form.querySelectorAll(".error-message");
  return errorMessages.length === 0;
}

function showError(input, message) {
  // Display an error message for the input field
  clearError(input);
  const errorElement = document.createElement("div");
  errorElement.className = "error-message";
  errorElement.innerText = message;
  input.parentNode.appendChild(errorElement);
}

function clearError(input) {
  // Clear the error message for the input field
  const errorElement = input.parentNode.querySelector(".error-message");
  if (errorElement) {
    errorElement.remove();
  }
}

function isValidEmail(email) {
  // Validation logic for email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function isValidMobileNumber(mobileNumber) {
  // Validation logic for mobile number format
  const mobileNumberPattern = /^\d{10}$/;
  return mobileNumberPattern.test(mobileNumber);
}


function resetForm() {
  nameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
  rePasswordInput.value = "";
  mobileNumberInput.value = "";
  genderInputs.forEach((input) => (input.checked = false));
 // agreeTermInput.checked = false;
  clearError(nameInput);
  clearError(emailInput);
  clearError(passwordInput);
  clearError(rePasswordInput);
  clearError(mobileNumberInput);
  clearError(genderInputs[0]);
  //clearError(agreeTermInput);
}