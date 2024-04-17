import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: AddAccountPage(),
    );
  }
}

class AddAccountPage extends StatelessWidget {
  const AddAccountPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: RichText(
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
                style: TextStyle(color: Colors.white),
              ),
            ],
          ),
        ),
        backgroundColor: Colors.black,
      ),
      body: const Padding(
        padding: EdgeInsets.all(16.0),
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
  const RegistrationForm({super.key});

  @override
  _RegistrationFormState createState() => _RegistrationFormState();
}

class _RegistrationFormState extends State<RegistrationForm> {
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _phoneNumberController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _confirmPasswordController = TextEditingController();

  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  String? _validateName(String? value) {
    if (value == null || value.isEmpty) {
      return 'Please enter your name';
    }
    // Validate name only contains letters and is under 20 characters
    RegExp nameRegex = RegExp(r'^[a-zA-Z]{1,20}$');
    if (!nameRegex.hasMatch(value)) {
      return 'Invalid name format';
    }
    return null;
  }

  String? _validateEmail(String? value) {
    if (value == null || value.isEmpty) {
      return 'Please enter your email';
    }
    // Strong email validation
    RegExp emailRegex = RegExp(r'^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$');
    if (!emailRegex.hasMatch(value)) {
      return 'Invalid email format';
    }
    return null;
  }

  String? _validatePhoneNumber(String? value) {
  if (value == null || value.isEmpty) {
    return 'Please enter your phone number';
  }

  // Validate if the phone number has the country code '+91' followed by 10 digits
  RegExp phoneRegex = RegExp(r'^\+91[1-9]\d{9}$');
  if (!phoneRegex.hasMatch(value)) {
    return 'Invalid phone number';
  }

  return null;
}



  String? _validatePassword(String? value) {
    if (value == null || value.isEmpty) {
      return 'Please enter a password';
    } else if (value.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    return null;
  }

  String? _validateConfirmPassword(String? value) {
    if (value == null || value.isEmpty) {
      return 'Please confirm your password';
    } else if (value != _passwordController.text) {
      return 'Passwords do not match';
    }
    return null;
  }

  Future<void> _registerUser() async {
    try {
      print('Registering user...');

      // Create user in Firebase Authentication
      UserCredential userCredential = await FirebaseAuth.instance.createUserWithEmailAndPassword(
        email: _emailController.text,
        password: _passwordController.text,
      );

      // Get the user ID from the created user
      String userId = userCredential.user!.uid;

      // Store additional user data in Firestore
      await FirebaseFirestore.instance.collection('profile').doc(userId).set({
        'name': _nameController.text,
        'email': _emailController.text,
        'phoneNumber': _phoneNumberController.text,
      });

      // Show a stylish alert
      _showRegistrationAlert(context);

      // Reload the page
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (BuildContext context) => super.widget,
        ),
      );

      print('Registration successful');
    } catch (e) {
      print('Error registering user: $e');
    }
  }

  // Function to show a stylish alert
  void _showRegistrationAlert(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Registration Successful'),
          content: const Text('Thank you for registering!'),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(); // Close the alert
              },
              child: const Text('OK'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          TextFormField(
            controller: _nameController,
            decoration: const InputDecoration(
              labelText: 'Name',
              labelStyle: TextStyle(color: Color.fromARGB(255, 243, 159, 33)),
              focusedBorder: OutlineInputBorder(
                borderSide: BorderSide(color: Color.fromARGB(255, 243, 159, 33), width: 2.0),
              ),
              enabledBorder: OutlineInputBorder(
                borderSide: BorderSide(color: Color.fromARGB(255, 243, 159, 33), width: 1.0),
              ),
            ),
            validator: _validateName,
          ),
          const SizedBox(height: 16.0),
          TextFormField(
            controller: _emailController,
            decoration: const InputDecoration(
              labelText: 'Email',
              labelStyle: TextStyle(color: Color.fromARGB(255, 243, 159, 33)),
              focusedBorder: OutlineInputBorder(
                borderSide: BorderSide(color: Color.fromARGB(255, 243, 159, 33), width: 2.0),
              ),
              enabledBorder: OutlineInputBorder(
                borderSide: BorderSide(color: Color.fromARGB(255, 243, 159, 33), width: 1.0),
              ),
            ),
            keyboardType: TextInputType.emailAddress,
            validator: _validateEmail,
          ),
          const SizedBox(height: 16.0),
          TextFormField(
            controller: _phoneNumberController,
            decoration: const InputDecoration(
              labelText: 'Phone Number',
              labelStyle: TextStyle(color: Color.fromARGB(255, 243, 159, 33)),
              focusedBorder: OutlineInputBorder(
                borderSide: BorderSide(color: Color.fromARGB(255, 243, 159, 33), width: 2.0),
              ),
              enabledBorder: OutlineInputBorder(
                borderSide: BorderSide(color: Color.fromARGB(255, 243, 159, 33), width: 1.0),
              ),
            ),
            keyboardType: TextInputType.phone,
            validator: _validatePhoneNumber,
          ),
          const SizedBox(height: 16.0),
          TextFormField(
            controller: _passwordController,
            decoration: const InputDecoration(
              labelText: 'Password',
              labelStyle: TextStyle(color: Color.fromARGB(255, 243, 159, 33)),
              focusedBorder: OutlineInputBorder(
                borderSide: BorderSide(color: Color.fromARGB(255, 243, 159, 33), width: 2.0),
              ),
              enabledBorder: OutlineInputBorder(
                borderSide: BorderSide(color: Color.fromARGB(255, 243, 159, 33), width: 1.0),
              ),
            ),
            obscureText: true,
            validator: _validatePassword,
          ),
          const SizedBox(height: 16.0),
          TextFormField(
            controller: _confirmPasswordController,
            decoration: const InputDecoration(
              labelText: 'Confirm Password',
              labelStyle: TextStyle(color: Color.fromARGB(255, 243, 159, 33)),
              focusedBorder: OutlineInputBorder(
                borderSide: BorderSide(color: Color.fromARGB(255, 243, 159, 33), width: 2.0),
              ),
              enabledBorder: OutlineInputBorder(
                borderSide: BorderSide(color: Color.fromARGB(255, 243, 159, 33), width: 1.0),
              ),
            ),
            obscureText: true,
            validator: _validateConfirmPassword,
          ),
          const SizedBox(height: 16.0),
          ElevatedButton(
            onPressed: () {
              if (_formKey.currentState!.validate()) {
                _registerUser();
              }
            },
            style: ButtonStyle(
              backgroundColor: MaterialStateProperty.all<Color>(const Color.fromARGB(255, 243, 159, 33)),
            ),
            child: const Padding(
              padding: EdgeInsets.symmetric(horizontal: 16.0, vertical: 12.0),
              child: Text('Register', style: TextStyle(color: Colors.white)),
            ),
          ),
        ],
      ),
    );
  }
}
