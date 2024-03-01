import 'dart:math';
import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class Station {
  String location;
  String longitude;
  String managerId;
  String stationId;
  String stationName;
  String latitude;

  Station({
    required this.location,
    required this.longitude,
    required this.managerId,
    required this.stationId,
    required this.stationName,
    required this.latitude,
  });
}

class FirebaseService {
  static Future<List<Station>> getStations() async {
    // Replace with your actual implementation to fetch data from Firebase
    // Example: Make an HTTP request or use a Firebase package
    return Future.delayed(Duration(seconds: 2), () {
      return [
        Station(
          location: "Kottayam",
          longitude: "76.5222",
          managerId: "manager1",
          stationId: "SID1",
          stationName: "Station 1",
          latitude: "9.5918",
        ),
        Station(
          location: "Some Location",
          longitude: "76.1234",
          managerId: "manager2",
          stationId: "SID2",
          stationName: "Station 2",
          latitude: "10.9876",
        ),
        // ... Add more stations
      ];
    });
  }
}

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _currentIndex = 0;
  final List<Widget> _pages = [
    Placeholder(),
    Placeholder(),
    Placeholder(),
    Placeholder(),
  ];

  GoogleMapController? _mapController;
  final LatLng kottayamLatLng = LatLng(9.5918, 76.5222);
  TextEditingController _searchController = TextEditingController();

  List<Station> _stations = [];

  double _calculateDistance(LatLng from, LatLng to) {
    const R = 6371.0; // Earth radius in kilometers
    double lat1 = from.latitude * pi / 180.0;
    double lon1 = from.longitude * pi / 180.0;
    double lat2 = to.latitude * pi / 180.0;
    double lon2 = to.longitude * pi / 180.0;

    double dLat = lat2 - lat1;
    double dLon = lon2 - lon1;

    double a = sin(dLat / 2) * sin(dLat / 2) +
        cos(lat1) * cos(lat2) * sin(dLon / 2) * sin(dLon / 2);

    double c = 2 * atan2(sqrt(a), sqrt(1 - a));

    return R * c; // Distance in kilometers
  }

  void _onItemTapped(int index) {
    setState(() {
      _currentIndex = index;
    });

    if (index == 1) {
      // Replace AccountPage() with your actual account page
      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => AccountPage()),
      );
    }
  }

  void _onMapCreated(GoogleMapController controller) {
    setState(() {
      _mapController = controller;
      _mapController?.animateCamera(CameraUpdate.newLatLngZoom(kottayamLatLng, 14.0));
    });
    _loadStations();
  }

  void _loadStations() async {
    try {
      List<Station> stations = await FirebaseService.getStations();
      setState(() {
        _stations = stations;
        _addMarkers();
      });
    } catch (error) {
      print('Error loading stations: $error');
    }
  }

  void _addMarkers() {
    LatLng currentLocation = LatLng(9.5918, 76.5222);
    for (Station station in _stations) {
      LatLng stationLocation = LatLng(
        double.parse(station.latitude),
        double.parse(station.longitude),
      );

      double distance = _calculateDistance(currentLocation, stationLocation);

          _mapController?.addMarker(
          Marker(
            markerId: MarkerId('your_unique_marker_id'),
              position: stationLocation,
              infoWindow: InfoWindow(
              title: '${station.stationName}',
                snippet: 'Distance: ${distance.toStringAsFixed(2)} km\n${station.location}',
    ),
  ),
);

    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: RichText(
          text: TextSpan(
            style: TextStyle(
              fontSize: 30.0,
              fontWeight: FontWeight.bold,
            ),
            children: [
              TextSpan(
                text: 'Charge',
                style: TextStyle(color: const Color.fromARGB(255, 243, 159, 33)),
              ),
              TextSpan(
                text: 'HUB',
                style: TextStyle(color: Color.fromARGB(255, 243, 159, 33)),
              ),
            ],
          ),
        ),
        backgroundColor: Colors.black,
      ),
      body: Stack(
        children: [
          GoogleMap(
            onMapCreated: _onMapCreated,
            initialCameraPosition: CameraPosition(target: kottayamLatLng, zoom: 14.0),
            myLocationButtonEnabled: false,
          ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: TextField(
              controller: _searchController,
              decoration: InputDecoration(
                hintText: 'Search...',
                prefixIcon: Icon(Icons.search),
                filled: true,
                fillColor: Colors.white,
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(10.0),
                  borderSide: BorderSide.none,
                ),
              ),
            ),
          ),
        ],
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: _onItemTapped,
        selectedItemColor: const Color.fromARGB(255, 243, 159, 33),
        unselectedItemColor: const Color.fromARGB(255, 243, 159, 33),
        backgroundColor: Colors.black,
        items: [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.account_circle),
            label: 'Account',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.timeline),
            label: 'Activity',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.people),
            label: 'Community',
          ),
        ],
      ),
    );
  }
}

class AccountPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Account Page'),
      ),
      body: Center(
        child: Text('This is the Account Page'),
      ),
    );
  }
}

void main() {
  runApp(MaterialApp(
    home: HomePage(),
  ));
}
