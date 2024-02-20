import 'package:flutter/material.dart';
import 'add_vehicle.dart';
class MyElectricVehiclePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: buildAppBar(),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('My Electric Vehicle Page'),
            // Add any additional widgets related to your electric vehicle page here
          ],
        ),
      ),
      floatingActionButton: Padding(
        padding: const EdgeInsets.all(16.0),
        child: ElevatedButton(
          onPressed: () {
            // Navigate to the SelectVehicleTypePage when the button is pressed
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => SelectVehicleTypePage()),
            );
          },
          child: Text('Add New Vehicle'),
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.orange, // Set the button color to orange
            foregroundColor: Colors.black, // Set the text color to black
            padding: EdgeInsets.symmetric(horizontal: 16.0, vertical: 12.0),
            textStyle: TextStyle(fontSize: 16.0),
          ),
        ),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
    );
  }
  

  AppBar buildAppBar() {
    return AppBar(
      title: buildAppBarTitle(),
      backgroundColor: Colors.black,
    );
  }

  Widget buildAppBarTitle() {
    return RichText(
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
            style: TextStyle(color: const Color.fromARGB(255, 243, 159, 33)),
          ),
        ],
      ),
    );
  }
}

