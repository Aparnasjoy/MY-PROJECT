// login_page.dart
import 'package:flutter/material.dart';
import 'phone_auth_service.dart';

class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final TextEditingController _phoneNumberController = TextEditingController();
  final PhoneAuthService _phoneAuthService = PhoneAuthService();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Login'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextField(
              controller: _phoneNumberController,
              decoration: InputDecoration(labelText: 'Phone Number'),
              keyboardType: TextInputType.phone,
            ),
            SizedBox(height: 16.0),
            ElevatedButton(
              onPressed: () async {
                String phoneNumber = _phoneNumberController.text.trim();
                if (phoneNumber.isNotEmpty) {
                  await _phoneAuthService.verifyPhoneNumber(context, phoneNumber);
                } else {
                  // Show an alert or handle empty phone number
                }
              },
              child: Text('Send OTP'),
            ),
          ],
        ),
      ),
    );
  }
}
