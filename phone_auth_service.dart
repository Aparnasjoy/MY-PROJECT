// phone_auth_service.dart
import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'otp_entry_screen.dart';

class PhoneAuthService {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  Future<bool> isPhoneNumberRegistered(String phoneNumber) async {
    try {
      // Check if the phone number exists in the 'profile' collection
      QuerySnapshot querySnapshot = await _firestore
          .collection('profile')
          .where('phoneNumber', isEqualTo: phoneNumber)
          .get();

      return querySnapshot.docs.isNotEmpty;
    } catch (e) {
      throw Exception('Error checking phone number registration: $e');
    }
  }

  Future<void> verifyPhoneNumber(BuildContext context, String phoneNumber) async {
  try {
    // Check if the phone number is already registered
    bool isRegistered = await isPhoneNumberRegistered(phoneNumber);

    if (isRegistered) {
      // If registered, initiate OTP verification
      await _auth.verifyPhoneNumber(
        phoneNumber: phoneNumber,
        verificationCompleted: (PhoneAuthCredential credential) async {
          // Handle verification completion (if needed)
        },
        verificationFailed: (FirebaseAuthException e) {
          // Handle verification failure
          print('Verification failed: $e');
        },
        codeSent: (String verificationId, int? resendToken) {
          // Handle when code is sent (navigate to OTP entry screen)
          // You can pass verificationId and resendToken to the OTP entry screen
          Navigator.pushReplacement(
            context,
            MaterialPageRoute(
              builder: (context) => OTPEntryScreen(verificationId, resendToken, phoneNumber),
            ),
          );
        },
        codeAutoRetrievalTimeout: (String verificationId) {
          // Handle code auto-retrieval timeout
          print('Code auto-retrieval timeout: $verificationId');
        },
      );
    } else {
      // If not registered, show an alert or handle as needed
      throw Exception('Phone number is not registered');
    }
  } catch (e) {
    throw Exception('Error verifying phone number: $e');
  }
}
}