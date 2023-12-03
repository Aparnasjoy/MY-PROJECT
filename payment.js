firebase.initializeApp(firebaseConfig);

const razorpay = new Razorpay({
    key_id: 'rzp_test_HaKkOFpjivI4is',
    key_secret: 'yeKyamqLgsgUMQeBdPhsqT4A',
});

document.getElementById('paymentButton').addEventListener('click', function () {
    // Create a payment object
    const options = {
        amount: 1000, // Amount in paisa (e.g., 1000 paisa = ₹10)
        currency: 'INR', // Currency code
        receipt: 'order_receipt_123', // Receipt ID
        payment_capture: '1', // Auto capture payment
    };

    // Open Razorpay checkout form
    razorpay.open(options);
});