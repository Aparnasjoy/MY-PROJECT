// VehicleNumberPage.dart
import 'package:flutter/material.dart';

class VehicleNumberPage extends StatelessWidget {
  final String vehicleType;

  VehicleNumberPage({required this.vehicleType});


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Enter Vehicle Number'),
        backgroundColor: Colors.black,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextFormField(
              decoration: InputDecoration(
                labelText: 'Vehicle Number',
                hintText: 'Enter vehicle number (e.g., AA 00 AA 0000)',
              ),
              keyboardType: TextInputType.text,
            ),
            SizedBox(height: 20.0),
            ElevatedButton(
              onPressed: () {
                // Handle the action when the continue button is pressed
                // You can navigate to the next screen or perform other actions
              },
              style: ButtonStyle(
                backgroundColor:
                    MaterialStateProperty.all<Color>(Colors.orange),
                padding: MaterialStateProperty.all<EdgeInsetsGeometry>(
                    EdgeInsets.all(16.0)),
              ),
              child: Text('ADD VEHICLE',
                  style: TextStyle(fontSize: 18.0, color: Colors.white)),
            ),
          ],
        ),
      ),
    );
  }
}
