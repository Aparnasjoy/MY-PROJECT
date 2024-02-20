import 'package:flutter/material.dart';

class MyPaymentsPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: buildAppBar(),
      body: Center(
        child: Text('My Payments Page'),
      ),
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
