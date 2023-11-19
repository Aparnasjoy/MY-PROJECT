firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.database();



auth.onAuthStateChanged((user) => {
    if (!user) {
        // Handle the case when the user is not logged in
        // Redirect or show a message
        // Example: window.location.href = "login.html";
        console.error("User not authenticated.");
    } else {
        const userProfileForm = document.getElementById("user-profile-form");
        const editButton = document.getElementById("edit-button");
        const updateButton = document.getElementById("update-button");

        editButton.addEventListener("click", () => {
            enableFormFields(userProfileForm);
            editButton.style.display = "none";
            updateButton.style.display = "block";
        });

        updateButton.addEventListener("click", () => {
            const name = userProfileForm.querySelector("#name").value;
            const mobileNumber = userProfileForm.querySelector("#mobile_number").value;
            const gender = userProfileForm.querySelector("input[name='gender']:checked").value;

            const userRef = db.ref("users/" + user.uid);
            userRef.update({
                name: name,
                mobile_number: mobileNumber,
                gender: gender,
            }).then(() => {
                console.log("User data updated successfully.");
                alert("User data updated successfully"); // Display success message in a pop-up alert
            }).catch((error) => {
                console.error("Error updating user data: ", error);
            });

            disableFormFields(userProfileForm);
            editButton.style.display = "block";
            updateButton.style.display = "none";
        });

        const userRef = db.ref("users/" + user.uid);
        userRef.once("value", (snapshot) => {
            const userData = snapshot.val();

            if (userData) {
                userProfileForm.querySelector("#name").value = userData.name;
                userProfileForm.querySelector("#mobile_number").value = userData.mobile_number;
                userProfileForm.querySelector(`#gender_${userData.gender}`).checked = true;
            } else {
                console.error("User data not found in the database.");
            }
        });
    }
});


function enableFormFields(form) {
    const formInputs = form.querySelectorAll(".form-input");
    formInputs.forEach((input) => {
        input.removeAttribute("disabled");
    });

    const radioButtons = form.querySelectorAll("input[type='radio']");
    radioButtons.forEach((radioButton) => {
        radioButton.removeAttribute("disabled");
    });
}


function disableFormFields(form) {
    const formInputs = form.querySelectorAll(".form-input");
    formInputs.forEach((input) => {
        input.setAttribute("disabled", true);
    });
}