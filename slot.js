// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to Firestore collection
const firestore = firebase.firestore();
const terminalsCollection = firestore.collection("terminals");

// Retrieve the terminal ID from the query parameter in the URL
const urlParams = new URLSearchParams(window.location.search);
const stationId = urlParams.get("stationId");

// Display the station ID in the header
const stationIdHeader = document.getElementById("stationIdHeader");
stationIdHeader.textContent = stationId;

const terminalId = urlParams.get("terminalId");

// Display the terminal ID in the header
const terminalIdHeader = document.getElementById("terminalIdHeader");
terminalIdHeader.textContent = terminalId;

// Reference to Firebase Realtime Database slots data
const slotsRef = firebase.database().ref(`terminals/${stationId}/${terminalId}/slots`);

// Wait for the authentication state to change
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        displaySlots();
    } else {
        // No user is signed in
        console.log('No user is signed in.');
        // You might want to redirect the user to the login page or handle this case appropriately
    }
});

function displaySlots() {
    // Fetch and display slots
    slotsRef.once('value')
        .then((snapshot) => {
            const slotsContainer = document.getElementById('slotsContainer');
            slotsContainer.innerHTML = ''; // Clear previous content

            snapshot.forEach((childSnapshot) => {
                const slotData = childSnapshot.val();
                // Create an element for each slot and append it to the container
                const slotElement = document.createElement('div');
                slotElement.textContent = `Slot ID: ${childSnapshot.key}, Status: ${slotData.status}`;
                slotsContainer.appendChild(slotElement);
            });
        })
        .catch((error) => {
            console.error('Error fetching slots:', error);
        });
}

function createSlots() {
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;

    // Validate that the end time is after the start time
    if (startTime >= endTime) {
        alert('End time must be after start time');
        return;
    }

    // Calculate the number of slots based on a fixed duration (e.g., 2 hours)
    const slotDuration = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
    const startDate = new Date(`01/01/2000 ${startTime}`);
    const endDate = new Date(`01/01/2000 ${endTime}`);
    let currentSlotStart = startDate.getTime();

    const slotsBatch = firestore.batch(); // Create a batch for batched write operations

    while (currentSlotStart + slotDuration <= endDate.getTime()) {
        // Format slot start and end times
        const slotStartTime = new Date(currentSlotStart);
        const slotEndTime = new Date(currentSlotStart + slotDuration);

        const formattedStartTime = slotStartTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const formattedEndTime = slotEndTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const slotId = `${formattedStartTime}-${formattedEndTime}`;

        // Save the slot data to Firebase Realtime Database
        slotsRef.child(slotId).set({
            status: 'Available'
        });

        // Save the slot data to Firestore
        const slotDocRef = firestore.collection("terminals").doc(terminalId).collection("slots").doc(slotId);
        slotsBatch.set(slotDocRef, {
            stationId,
            terminalId,
            startTime: formattedStartTime,
            endTime: formattedEndTime,
            status: 'Available'
        });

        // Move to the next slot
        currentSlotStart += slotDuration;
    }

    slotsBatch.commit() // Commit the batched write operations
        .then(() => {
            alert('Slots created successfully!');
        })
        .catch((error) => {
            console.error('Error creating slots:', error);
            alert('Error creating slots. Please try again.');
        });
}
