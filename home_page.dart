import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'account_page.dart';
import 'package:firebase_database/firebase_database.dart';
import 'stationdetail_page.dart';

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
  final LatLng kottayamLatLng = LatLng(9.5918, 76.5222); // Kottayam, Kerala
  Set<Marker> _markers = {};
  DatabaseReference _databaseReference = FirebaseDatabase.instance.reference().child('station');
  String _selectedStation = '';
   // Declare _selectedStationId here

  void _onItemTapped(int index) {
    setState(() {
      _currentIndex = index;
    });

    if (index == 1) {
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
  }

  void _loadStations() {
    _databaseReference.onValue.listen((DatabaseEvent event) {
      DataSnapshot snapshot = event.snapshot;

      if (snapshot.value != null && snapshot.value is Map<dynamic, dynamic>) {
        Map<dynamic, dynamic> data = snapshot.value as Map<dynamic, dynamic>;

        List<Marker> markers = [];

        data.forEach((key, value) {
          double latitude = double.parse(value['latitude']);
          double longitude = double.parse(value['longitude']);

          markers.add(
            Marker(
              markerId: MarkerId(key),
              position: LatLng(latitude, longitude),
              infoWindow: InfoWindow(
                title: value['stationName'],
                snippet: 'Location: ${value['location']}', // Display location here
              ),
              icon: BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueGreen),
            ),
          );

          
        });

        setState(() {
          _markers = markers.toSet();
        });
      }
    });
  }

  @override
  void initState() {
    super.initState();
    _loadStations();
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
            markers: _markers,
          ),
          Positioned(
            top: 0,
            left: 0,
            right: 0,
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Container(
                    decoration: BoxDecoration(
                      border: Border.all(color: Color.fromARGB(255, 245, 245, 244), width: 2.0),
                      borderRadius: BorderRadius.circular(10.0),
                      color: Colors.white,
                    ),
                    child: DropdownButton<String>(
                      value: _selectedStation.isEmpty ? null : _selectedStation,
                      hint: Text(
                        'Search....',
                        style: TextStyle(
                          fontSize: 18.0,
                          color: Colors.black,
                        ),
                      ),
                      style: TextStyle(
                        fontSize: 18.0,
                        color: Colors.black,
                      ),
                      dropdownColor: Colors.white,
                      elevation: 5,
                      icon: Icon(Icons.arrow_drop_down),
                      iconSize: 36.0,
                      iconEnabledColor: const Color.fromARGB(255, 240, 235, 235),
                     onChanged: (newValue) {
    setState(() {
      _selectedStation = newValue!;
    });
    // Navigate to the station details page here
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => StationDetailsPage(stationName: newValue!)),
    );
  },
                      items: _markers.map((Marker marker) {
                        return DropdownMenuItem<String>(
                          value: marker.infoWindow.title ?? '',
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Text(
                              marker.infoWindow.title ?? '',
                              style: TextStyle(
                                fontSize: 18.0,
                              ),
                            ),
                          ),
                        );
                      }).toList(),
                    ),
                  ),
                ],
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
