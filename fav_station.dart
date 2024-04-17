import 'package:flutter/material.dart';

class MyFavoriteStationPage extends StatelessWidget {
  const MyFavoriteStationPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: buildAppBar(),
      body: const Center(
        child: Text('My Favorite Station Page'),
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
      text: const TextSpan(
        style: TextStyle(
          fontSize: 30.0,
          fontWeight: FontWeight.bold,
        ),
        children: [
          TextSpan(
            text: 'Charge',
            style: TextStyle(color: Color.fromARGB(255, 243, 159, 33)),
          ),
          TextSpan(
            text: 'HUB',
            style: TextStyle(color: Color.fromARGB(255, 243, 159, 33)),
          ),
        ],
      ),
    );
  }
}
