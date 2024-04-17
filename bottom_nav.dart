// bottom_nav_bar.dart

import 'package:flutter/material.dart';

class BottomNavBar extends StatelessWidget {
  final int currentIndex;
  final Function(int) onItemTapped;

  const BottomNavBar({super.key, 
    required this.currentIndex,
    required this.onItemTapped,
  });

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      currentIndex: currentIndex,
      onTap: onItemTapped,
      selectedItemColor: const Color.fromARGB(255, 243, 159, 33),
      unselectedItemColor: const Color.fromARGB(255, 243, 159, 33),
      backgroundColor: Colors.black,
      items: const [
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
    );
  }
}
