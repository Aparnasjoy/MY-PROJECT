firebase.initializeApp(firebaseConfig);

var db = firebase.database();
const stationsRef = db.ref("station");

function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

const stationId = getQueryParam("stationId");
const stationIdHeader = document.getElementById("stationIdHeader");
stationIdHeader.textContent = stationId;

// Load station details and pre-fill the form
stationsRef.child(stationId).once("value")
    .then(function(snapshot) {
        const station = snapshot.val();
        if (station) {
            document.getElementById("stationName").value = station.stationName;
            document.getElementById("location").value = station.location;
            // Pre-fill other fields as needed
        } else {
            console.error("Station not found for the given ID.");
        }
    })
    .catch(function(error) {
        console.error("Error loading station details: ", error);
    });
