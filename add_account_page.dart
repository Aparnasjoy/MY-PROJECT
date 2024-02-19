// add_account_page.dart
import 'package:flutter/material.dart';

class AddAccountPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: RichText(
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
                style: TextStyle(color: Colors.white),
              ),
            ],
          ),
        ),
        backgroundColor: Colors.black,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            RegistrationForm(),
          ],
        ),
      ),
    );
  }
}

class RegistrationForm extends StatefulWidget {
  @override
  _RegistrationFormState createState() => _RegistrationFormState();
}

class _RegistrationFormState extends State<RegistrationForm> {
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _phoneNumberController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _confirmPasswordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Form(
      child: Column(
        children: [
          TextFormField(
            controller: _nameController,
            decoration: InputDecoration(
              labelText: 'Name',
              labelStyle: TextStyle(color: const Color.fromARGB(255, 243, 159, 33)),
              focusedBorder: OutlineInputBorder(
                borderSide: BorderSide(color: const Color.fromARGB(255, 243, 159, 33), width: 2.0),
              ),
              enabledBorder: OutlineInputBorder(
                borderSide: BorderSide(color: const Color.fromARGB(255, 243, 159, 33), width: 1.0),
              ),
            ),
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Please enter your name';
              }
              return null;
            },
          ),
          SizedBox(height: 16.0),
          TextFormField(
            controller: _emailController,
            decoration: InputDecoration(
              labelText: 'Email',
              labelStyle: TextStyle(color: const Color.fromARGB(255, 243, 159, 33)),
              focusedBorder: OutlineInputBorder(
                borderSide: BorderSide(color: const Color.fromARGB(255, 243, 159, 33), width: 2.0),
              ),
              enabledBorder: OutlineInputBorder(
                borderSide: BorderSide(color: const Color.fromARGB(255, 243, 159, 33), width: 1.0),
              ),
            ),
            keyboardType: TextInputType.emailAddress,
            validator: (value) {
              // Add email validation logic if needed
              return null;
            },
          ),
          SizedBox(height: 16.0),
          TextFormField(
            controller: _phoneNumberController,
            decoration: InputDecoration(
              labelText: 'Phone Number',
              labelStyle: TextStyle(color: const Color.fromARGB(255, 243, 159, 33)),
              focusedBorder: OutlineInputBorder(
                borderSide: BorderSide(color: const Color.fromARGB(255, 243, 159, 33), width: 2.0),
              ),
              enabledBorder: OutlineInputBorder(
                borderSide: BorderSide(color: const Color.fromARGB(255, 243, 159, 33), width: 1.0),
              ),
            ),
            keyboardType: TextInputType.phone,
            validator: (value) {
              // Add phone number validation logic if needed
              return null;
            },
          ),
          SizedBox(height: 16.0),
          TextFormField(
            controller: _passwordController,
            decoration: InputDecoration(
              labelText: 'Password',
              labelStyle: TextStyle(color: const Color.fromARGB(255, 243, 159, 33)),
              focusedBorder: OutlineInputBorder(
                borderSide: BorderSide(color: const Color.fromARGB(255, 243, 159, 33), width: 2.0),
              ),
              enabledBorder: OutlineInputBorder(
                borderSide: BorderSide(color: const Color.fromARGB(255, 243, 159, 33), width: 1.0),
              ),
            ),
            obscureText: true,
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Please enter a password';
              }
              return null;
            },
          ),
          SizedBox(height: 16.0),
          TextFormField(
            controller: _confirmPasswordController,
            decoration: InputDecoration(
              labelText: 'Confirm Password',
              labelStyle: TextStyle(color: const Color.fromARGB(255, 243, 159, 33)),
              focusedBorder: OutlineInputBorder(
                borderSide: BorderSide(color: const Color.fromARGB(255, 243, 159, 33), width: 2.0),
              ),
              enabledBorder: OutlineInputBorder(
                borderSide: BorderSide(color: const Color.fromARGB(255, 243, 159, 33), width: 1.0),
              ),
            ),
            obscureText: true,
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Please confirm your password';
              } else if (value != _passwordController.text) {
                return 'Passwords do not match';
              }
              return null;
            },
          ),
          SizedBox(height: 16.0),
          ElevatedButton(
            onPressed: () {
              if (Form.of(context)!.validate()) {
                // Perform registration logic here
                // You can access the entered values using _nameController.text, _emailController.text, etc.
              }
            },
            style: ButtonStyle(
              backgroundColor: MaterialStateProperty.all<Color>(const Color.fromARGB(255, 243, 159, 33)),
            ),
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 12.0),
              child: Text('Register', style: TextStyle(color: Colors.white)),
            ),
          ),
        ],
      ),
    );
  }
}
