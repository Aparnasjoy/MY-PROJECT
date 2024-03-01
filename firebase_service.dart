import 'package:firebase_database/firebase_database.dart';

class FirebaseService {
  static final DatabaseReference _database = FirebaseDatabase.instance.reference();

  static Future<List<Station>> getStations() async {
    List<Station> stations = [];

    try {
      DataSnapshot snapshot = await _database.child('stations').once();

      if (snapshot.value != null) {
        Map<String, dynamic> data = snapshot.value;

        data.forEach((key, value) {
          Station station = Station(
            location: value['location'] ?? '',
            longitude: value['longitude'] ?? '',
            managerId: value['managerId'] ?? '',
            stationId: value['stationId'] ?? '',
            stationName: value['stationName'] ?? '',
            latitude: value['latitude'] ?? '',
          );
          stations.add(station);
        });
      }
    } catch (e) {
      print('Error fetching stations: $e');
    }

    return stations;
  }
}

class Station {
  String location;
  String longitude;
  String managerId;
  String stationId;
  String stationName;
  String latitude;

  Station({
    required this.location,
    required this.longitude,
    required this.managerId,
    required this.stationId,
    required this.stationName,
    required this.latitude,
  });
}
