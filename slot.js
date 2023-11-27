firebase.initializeApp(firebaseConfig);

var db = firebase.database();
const stationsRef = db.ref("station");


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

// You can add additional JavaScript logic for your slot page below

// slot.js



// Reference to Firebase slots data
const slotsRef = firebase.database().ref(`stations/${stationId}/terminals/${terminalId}/slots`);

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

    const slotsContainer = document.getElementById('slotsContainer');
    slotsContainer.innerHTML = ''; // Clear previous content

    // Calculate the number of slots based on a fixed duration (e.g., 2 hours)
    const slotDuration = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
    const startDate = new Date(`01/01/2000 ${startTime}`);
    const endDate = new Date(`01/01/2000 ${endTime}`);
    let currentSlotStart = startDate.getTime();

    while (currentSlotStart + slotDuration <= endDate.getTime()) {
        const slotElement = document.createElement('div');

        // Format slot start and end times
        const slotStartTime = new Date(currentSlotStart);
        const slotEndTime = new Date(currentSlotStart + slotDuration);

        const formattedStartTime = slotStartTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const formattedEndTime = slotEndTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const slotId = `${formattedStartTime}-${formattedEndTime}`;
        slotElement.textContent = `Slot ID: ${slotId}, Status: Available`;
        slotsContainer.appendChild(slotElement);

        // Save the slot data to Firebase
        slotsRef.child(slotId).set({
            status: 'Available'
        });

        // Move to the next slot
        currentSlotStart += slotDuration;
    }

    alert('Slots created successfully!');
}


document.getElementById("submitButton").addEventListener("click", function () {
    // Reload the page
    location.reload();
});
