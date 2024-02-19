import 'package:flutter/material.dart';
import 'bottom_nav.dart';
import 'profile_page.dart';
import 'payment_page.dart';
import 'vehicle_page.dart';
import 'fav_station.dart';

void main() {
  runApp(MyApp());
}

class AccountPage extends StatelessWidget {
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
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            StyledButton(
              label: 'Profile',
              icon: Icons.person,
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => ProfilePage()),
                );
              },
            ),
            StyledButton(
              label: 'My Payments',
              icon: Icons.payment,
              onPressed: () {
                Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => MyPaymentsPage()),
                // Add your logic for the 'My Payments' button
              );
              },
            ),
            StyledButton(
              label: 'My Electric Vehicle',
              icon: Icons.electric_scooter, // Changed icon
              onPressed: () {
                Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => MyElectricVehiclePage()),
                // Add your logic for the 'My Electric Vehicle' button
               );
              },
            ),
            StyledButton(
              label: 'My Favorite Station',
              icon: Icons.favorite,
              onPressed: () {
                Navigator.push(
                 context,
                 MaterialPageRoute(builder: (context) => MyFavoriteStationPage()),
               );
              },
            ),
          ],
        ),
      ),
      bottomNavigationBar: BottomNavBar(
        currentIndex: 1, // Set the index for 'Account' in the bottom navigation bar
        onItemTapped: (index) {
          if (index != 1) {
            Navigator.popUntil(context, ModalRoute.withName('/')); // Navigate back to home page
          }
        },
      ),
    );
  }
}

class StyledButton extends StatelessWidget {
  final String label;
  final IconData icon;
  final VoidCallback onPressed;

  const StyledButton({
    required this.label,
    required this.icon,
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: SizedBox(
        width: 300.0,
        child: ElevatedButton(
          onPressed: onPressed,
          style: ButtonStyle(
            padding: MaterialStateProperty.all<EdgeInsetsGeometry>(
              EdgeInsets.symmetric(vertical: 8.0, horizontal: 12.0),
            ),
            backgroundColor: MaterialStateProperty.all<Color>(Colors.white),
            foregroundColor: MaterialStateProperty.all<Color>(Colors.orange),
            shape: MaterialStateProperty.all<OutlinedBorder>(
              RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(8.0),
                side: BorderSide(color: Colors.orange),
              ),
            ),
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              if (label == 'My Electric Vehicle') ...[
                Icon(Icons.electric_scooter, size: 30.0, color: Colors.orange),
                SizedBox(height: 4.0), // Adjusted height
              ] else ...[
                Icon(icon, size: 30.0, color: Colors.orange),
                SizedBox(height: 4.0), // Adjusted height
              ],
              Text(
                label,
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 14.0,
                  fontWeight: FontWeight.bold,
                  color: Colors.orange,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'ChargeHUB',
      theme: ThemeData(
        primarySwatch: Colors.orange,
      ),
      home: AccountPage(),
    );
  }
}
