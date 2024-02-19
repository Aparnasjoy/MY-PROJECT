import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

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
  TextEditingController _searchController = TextEditingController();

   void _onItemTapped(int index) {
    setState(() {
      _currentIndex = index;
    });

    // Check if the "Account" tab is tapped
    if (index == 1) {
      // Navigate to the account page
      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => account_page()), // Replace AccountPage() with your actual account page
      );
    }
  }

  void _onMapCreated(GoogleMapController controller) {
    setState(() {
      _mapController = controller;
      _mapController?.animateCamera(CameraUpdate.newLatLngZoom(kottayamLatLng, 14.0));
    });
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
                style: TextStyle(color: const Color.fromARGB(255, 243, 159, 33)), // Change color for "Charge"
              ),
              TextSpan(
                text: 'HUB',
                style: TextStyle(color: Color.fromARGB(255, 243, 159, 33)), // Change color for "HUB"
              ),
            ],
          ),
        ),
        backgroundColor: Colors.black, // Change background color of header to black
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
        selectedItemColor: const Color.fromARGB(255, 243, 159, 33), // Orange color for selected item
        unselectedItemColor: const Color.fromARGB(255, 243, 159, 33), // Orange color for unselected items
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
