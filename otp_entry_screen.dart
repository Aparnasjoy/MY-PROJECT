import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';

class OTPEntryScreen extends StatefulWidget {
  final String verificationId;
  final int? resendToken;
  final String phoneNumber;

  const OTPEntryScreen(this.verificationId, this.resendToken, this.phoneNumber);

  @override
  _OTPEntryScreenState createState() => _OTPEntryScreenState();
}

class _OTPEntryScreenState extends State<OTPEntryScreen> {
  final TextEditingController _otpController = TextEditingController();
  final FirebaseAuth _auth = FirebaseAuth.instance;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Enter OTP'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextField(
              controller: _otpController,
              decoration: InputDecoration(labelText: 'OTP'),
              keyboardType: TextInputType.number,
            ),
            SizedBox(height: 16.0),
            ElevatedButton(
              onPressed: () async {
                String otp = _otpController.text.trim();
                if (otp.isNotEmpty) {
                  PhoneAuthCredential credential = PhoneAuthProvider.credential(
                    verificationId: widget.verificationId,
                    smsCode: otp,
                  );

                  await _auth.signInWithCredential(credential).then((userCredential) {
                    // Handle successful login
                    // You can access the logged-in user with userCredential.user
                  }).catchError((error) {
                    // Handle login failure
                    print('Login failed: $error');
                  });
                } else {
                  // Show an alert or handle empty OTP
                }
              },
              child: Text('Verify OTP'),
            ),
          ],
        ),
      ),
    );
  }
}
