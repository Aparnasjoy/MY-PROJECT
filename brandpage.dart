// BrandPage.dart
import 'package:flutter/material.dart';
import 'vehicle_number_page.dart';

class BrandPage extends StatefulWidget {
  final String vehicleType;

  const BrandPage({super.key, required this.vehicleType});

  @override
  _BrandPageState createState() => _BrandPageState();
}

class _BrandPageState extends State<BrandPage> {
  int selectedBrandIndex = -1;

  // Modify this map with your actual data
  final Map<String, List<Brand>> brandMap = {
    '2 Wheeler': [
      Brand('assets/ather2.png'),
      Brand('assets/bajaj2.png'),
      Brand('assets/dao2.png'),
      Brand('assets/elthor2.png'),
      Brand('assets/ola2.png'),
      Brand('assets/tvs2.png')
    ],
    '3 Wheeler': [
      Brand('assets/ETO3.png'),
      Brand('assets/hykon3.png'),
      Brand('assets/volta3.png'),
      Brand('assets/mahindra3.png'),
      Brand('assets/altigreen3.png')
    ],
    '4 Wheeler': [
      Brand('assets/audi4.png'),
      Brand('assets/bmw4.png'),
      Brand('assets/hyundai4.png'),
      Brand('assets/kia4.png'),
      Brand('assets/mahindra4.png'),
      Brand('assets/tata4.png')
    ],
    'Heavy Vehicle': [
      Brand('assets/olectra5.png')
    ],
  };

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Select ${widget.vehicleType} Brand'),
        backgroundColor: Colors.black,
      ),
      body: GridView.builder(
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          crossAxisSpacing: 16.0,
          mainAxisSpacing: 16.0,
        ),
        itemCount: brandMap[widget.vehicleType]?.length ?? 0,
        padding: const EdgeInsets.all(16.0),
        itemBuilder: (context, index) {
          Brand brand = brandMap[widget.vehicleType]![index];
          return buildBrandItem(context, brand, index);
        },
      ),
      bottomNavigationBar: selectedBrandIndex != -1
          ? Padding(
              padding: const EdgeInsets.all(16.0),
              child: ElevatedButton(
                onPressed: () {
                  // Continue button action
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => VehicleNumberPage(vehicleType: widget.vehicleType),
                    ),
                  );
                },
                style: ButtonStyle(
                  backgroundColor: MaterialStateProperty.all<Color>(const Color.fromARGB(255, 243, 159, 33)),
                ),
                child: const Text('Continue', style: TextStyle(fontSize: 18.0, color: Colors.white)),
              ),
            )
          : null,
    );
  }

  Widget buildBrandItem(BuildContext context, Brand brand, int index) {
    bool isSelected = selectedBrandIndex == index;

    return GestureDetector(
      onTap: () {
        setState(() {
          selectedBrandIndex = isSelected ? -1 : index;
        });
      },
      child: Card(
        elevation: isSelected ? 8.0 : 2.0,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8.0)),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              padding: const EdgeInsets.all(8.0),
              decoration: BoxDecoration(
                border: Border.all(
                  color: isSelected ? Colors.orange : Colors.transparent,
                  width: 2.0,
                ),
                borderRadius: BorderRadius.circular(8.0),
              ),
              child: Image.asset(
                brand.iconPath,
                width: 100.0,
                height: 100.0,
                fit: BoxFit.contain,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class Brand {
  final String iconPath;

  Brand(this.iconPath);
}
