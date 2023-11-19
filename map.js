// Initialize the Firebase app with your configuration
firebase.initializeApp(firebaseConfig);

// Reference to Firebase charging stations data
var chargingStationsRef = firebase.database().ref('station');

// Initialize the map
var map = L.map('map').setView([9.5916, 76.5222], 13); // Default view set to Kottayam, Kerala

// Add an OSM tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Fetch charging station data from Firebase
chargingStationsRef.once('value').then(function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var station = childSnapshot.val();

    // Check if station and location properties exist before using them
    if (station && station.location) {
      // Add marker for each charging station in Kottayam
      if (station.location.toLowerCase().includes('kottayam')) {
        var marker = L.marker([station.latitude, station.longitude])
          .addTo(map)
          .bindPopup(`<b>${station.stationName}</b><br>${station.location}`)
          .on('click', function () {
            // Navigate to findstation page with station ID as a query parameter
            window.location.href = `findstation.html?stationId=${station.stationId}`;
          });
      }
    }
  });
}).catch(function(error) {
  console.error('Error fetching charging stations:', error);
});
