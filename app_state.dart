// app_state.dart
import 'package:flutter/material.dart';

class AppState with ChangeNotifier {
  String selectedBrand = '';
  String vehicleNumber = '';

  void updateSelectedBrand(String brand) {
    selectedBrand = brand;
    notifyListeners();
  }

  void updateVehicleNumber(String number) {
    vehicleNumber = number;
    notifyListeners();
  }
}
