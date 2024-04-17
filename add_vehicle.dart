// SelectVehicleTypePage.dart
import 'package:flutter/material.dart';
import 'dart:typed_data' show Uint8List;
import 'package:flutter/services.dart' show ByteData, rootBundle;
import 'brandpage.dart'; // Import the BrandPage file

class SelectVehicleTypePage extends StatefulWidget {
  const SelectVehicleTypePage({super.key});

  @override
  _SelectVehicleTypePageState createState() => _SelectVehicleTypePageState();
}

class _SelectVehicleTypePageState extends State<SelectVehicleTypePage> {
  int selectedIconIndex = -1;

  Future<Uint8List?> loadAsset(String assetPath) async {
    try {
      ByteData data = await rootBundle.load(assetPath);
      return data.buffer.asUint8List();
    } catch (e) {
      print('Error loading asset: $e');
      return null;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: buildAppBarTitle(),
        backgroundColor: Colors.black,
      ),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          buildHeaderText(),
          buildVehicleIcons(context),
          ElevatedButton(
            onPressed: () {
              if (selectedIconIndex != -1) {
                String vehicleType = getVehicleType(selectedIconIndex);
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => BrandPage(vehicleType: vehicleType),
                  ),
                );
              } else {
                // Show a message or handle the case where no vehicle type is selected
              }
            },
            style: ButtonStyle(
              backgroundColor: MaterialStateProperty.all<Color>(const Color.fromARGB(255, 243, 159, 33)),
              padding: MaterialStateProperty.all<EdgeInsetsGeometry>(const EdgeInsets.all(16.0)),
            ),
            child: const Text('Continue', style: TextStyle(fontSize: 18.0, color: Colors.white)),
          ),
        ],
      ),
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
            text: 'Select',
            style: TextStyle(color: Color.fromARGB(255, 243, 159, 33)),
          ),
          TextSpan(
            text: ' Vehicle Type',
            style: TextStyle(color: Color.fromARGB(255, 243, 159, 33)),
          ),
        ],
      ),
    );
  }

  Widget buildHeaderText() {
    return RichText(
      text: const TextSpan(
        style: TextStyle(
          fontSize: 20.0,
          fontWeight: FontWeight.bold,
        ),
        children: [
          TextSpan(
            text: ' ',
            style: TextStyle(color: Color.fromARGB(255, 243, 159, 33)),
          ),
          TextSpan(
            text: '  ',
            style: TextStyle(color: Color.fromARGB(255, 243, 159, 33)),
          ),
        ],
      ),
    );
  }

  Widget buildVehicleIcons(BuildContext context) {
    return Expanded(
      child: GridView.count(
        crossAxisCount: 2,
        crossAxisSpacing: 16.0,
        mainAxisSpacing: 16.0,
        padding: const EdgeInsets.all(16.0),
        children: [
          buildSelectableVehicleIcon(context, 'assets/2_wheeler.png', 0),
          buildSelectableVehicleIcon(context, 'assets/3_wheeler.png', 1),
          buildSelectableVehicleIcon(context, 'assets/4_wheeler.png', 2),
          buildSelectableVehicleIcon(context, 'assets/heavy.png', 3),
        ],
      ),
    );
  }

  Widget buildSelectableVehicleIcon(BuildContext context, String assetPath, int index) {
    bool isSelected = selectedIconIndex == index;

    return GestureDetector(
      onTap: () {
        setState(() {
          selectedIconIndex = isSelected ? -1 : index;
        });
      },
      child: Container(
        decoration: BoxDecoration(
          border: Border.all(
            color: isSelected ? Colors.orange : Colors.transparent,
            width: 2.0,
          ),
          borderRadius: BorderRadius.circular(8.0),
        ),
        padding: const EdgeInsets.all(8.0),
        child: FutureBuilder(
          future: loadAsset(assetPath),
          builder: (context, AsyncSnapshot<Uint8List?> snapshot) {
            if (snapshot.connectionState == ConnectionState.done && snapshot.data != null) {
              return Image.memory(
                snapshot.data!,
                width: 100.0,
                height: 100.0,
              );
            } else {
              return const CircularProgressIndicator();
            }
          },
        ),
      ),
    );
  }

  String getVehicleType(int index) {
    switch (index) {
      case 0:
        return '2 Wheeler';
      case 1:
        return '3 Wheeler';
      case 2:
        return '4 Wheeler';
      case 3:
        return 'Heavy Vehicle';
      default:
        return '';
    }
  }
}
