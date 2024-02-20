// profile_page.dart
import 'package:flutter/material.dart';
import 'add_account_page.dart';

class ProfilePage extends StatelessWidget {
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
      body: Align(
        alignment: Alignment.bottomCenter,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => AddAccountPage()),
                );
              },
              style: ButtonStyle(
                padding: MaterialStateProperty.all<EdgeInsetsGeometry>(
                  EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
                ),
                backgroundColor: MaterialStateProperty.all<Color>(Colors.orange),
                foregroundColor: MaterialStateProperty.all<Color>(Colors.white),
                shape: MaterialStateProperty.all<OutlinedBorder>(
                  RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8.0),
                  ),
                ),
              ),
              child: Text('Add Account'),
            ),
            SizedBox(height: 16.0),
            
          ],
        ),
      ),
    );
  }
}
