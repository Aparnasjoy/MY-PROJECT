// Function to calculate distance between two points using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1);
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var distance = R * c; // Distance in km
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

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

// Define a custom icon for the user
var userIcon = L.icon({
  iconUrl: 'images/icons/mapicon.jpg', // Provide the path to your icon image
  iconSize: [32, 32], // Set the size of the icon
  iconAnchor: [16, 32], // Set the anchor point of the icon
  popupAnchor: [0, -32] // Set the popup anchor point
});

// Get the user's current location
navigator.geolocation.getCurrentPosition(function(position) {
  var userLat = position.coords.latitude;
  var userLng = position.coords.longitude;

  // Add a marker for the user's current location with the custom icon
  var userMarker = L.marker([userLat, userLng], { icon: userIcon })
    .addTo(map)
    .bindPopup("Your current location")
    .openPopup();

  // Fetch charging station data from Firebase
  chargingStationsRef.once('value').then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var station = childSnapshot.val();

      // Check if station and location properties exist before using them
      if (station && station.location) {
        // Calculate distance using Haversine formula
        var stationLat = station.latitude;
        var stationLng = station.longitude;
        var distance = calculateDistance(userLat, userLng, stationLat, stationLng);

        // Add marker for each charging station in Kottayam
        var marker = L.marker([stationLat, stationLng])
          .addTo(map)
          .bindPopup(`<b>${station.stationName}</b><br>${station.location}`)
          .on('mouseover', function (e) {
            // Close the existing popup
            marker.closePopup();
            
            // Open a new popup with the updated content
            var updatedPopupContent = `<b>${station.stationName}</b><br>${station.location}<br>Distance: ${distance.toFixed(2)} km`;
            marker.bindPopup(updatedPopupContent).openPopup();
          })
          .on('mouseout', function () {
            // Reset the popup content when mouseout occurs
            marker.bindPopup(`<b>${station.stationName}</b><br>${station.location}`);
          })
          .on('click', function () {
            // Navigate to findstation page with station ID as a query parameter
            window.location.href = `findstation.html?stationId=${station.stationId}`;
          });
      }
    });
  }).catch(function(error) {
    console.error('Error fetching charging stations:', error);
  });
});
