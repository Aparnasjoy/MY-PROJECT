// Initialize the Firebase app
firebase.initializeApp(firebaseConfig);

// Reference to Firebase charging stations data
var chargingStationsRef = firebase.database().ref('station');

// Get the station ID from the URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const stationId = urlParams.get('stationId');

// Fetch station details using the station ID
if (stationId) {
  const stationRef = db.ref("station");

  stationRef.once('value')
    .then((snapshot) => {
      const station = snapshot.val();

      if (station) {
        // Update the content dynamically
        const stationNameElement = document.getElementById('stationName');
        const stationLocationElement = document.getElementById('Location');

        stationNameElement.textContent = station.stationName;
        stationLocationElement.textContent = station.location;
      } else {
        // Handle case where no station is found
        console.error('Station not found in the database.');
      }
    })
    .catch((error) => {
      console.error('Error fetching station details:', error.message);
      console.error('Error code:', error.code);
    });
} else {
  console.error('Station ID not found in the URL');
}