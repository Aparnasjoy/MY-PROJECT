// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

// Wait for the authentication state to change
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        displayVehicles(user);
    } else {
        // No user is signed in
        console.log('No user is signed in.');
        // You might want to redirect the user to the login page or handle this case appropriately
    }
});

function displayVehicles(user) {
    // Create a reference to the 'vehicles' node in the database
    const vehiclesRef = db.ref(`users/${user.uid}/vehicles`);

    // Clear previous vehicle details
    const vehicleDetailsContainer = document.getElementById('vehicleDetails');
    vehicleDetailsContainer.innerHTML = '';

    // Fetch and display vehicles
    vehiclesRef.once('value')
        .then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const vehicleData = childSnapshot.val();
                addVehicleToDOM(vehicleData);
            });
        })
        .catch((error) => {
            console.error('Error fetching vehicles:', error);
        });
}

function addVehicleToDOM(vehicleData) {
    // Create a container for the vehicle
    const vehicleContainer = document.createElement('div');
    vehicleContainer.classList.add('vehicle-container');

    // Create paragraphs for each detail
    const typeParagraph = document.createElement('p');
    typeParagraph.textContent = `TYPE: ${vehicleData.type}`;

    const brandParagraph = document.createElement('p');
    brandParagraph.textContent = `BRAND: ${vehicleData.brand}`;

    const numberParagraph = document.createElement('p');
    numberParagraph.textContent = `NUMBER: ${vehicleData.number}`;

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function () {
        // Implement the logic to delete the vehicle from the database
        deleteVehicle(vehicleData);
    };

    // Append paragraphs and delete button to the vehicle container
    vehicleContainer.appendChild(typeParagraph);
    vehicleContainer.appendChild(brandParagraph);
    vehicleContainer.appendChild(numberParagraph);
    vehicleContainer.appendChild(deleteButton);

    // Append the vehicle container to the DOM
    const vehicleDetailsContainer = document.getElementById('vehicleDetails');
    vehicleDetailsContainer.appendChild(vehicleContainer);
}

function deleteVehicle(vehicleData) {
    // Implement the logic to delete the vehicle from the database
    // You need to use the vehicleData and the user information to construct the path to the vehicle in the database
    const user = auth.currentUser;
    const vehicleRef = db.ref(`users/${user.uid}/vehicles/${vehicleData.vehicleKey}`);

    // Remove the vehicle from the database
    vehicleRef.remove()
        .then(() => {
            console.log('Vehicle deleted successfully.');
            // Refresh the displayed vehicles
            displayVehicles(user);
        })
        .catch((error) => {
            console.error('Error deleting vehicle:', error);
        });
}
