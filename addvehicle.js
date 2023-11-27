firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const db = firebase.database();

let selectedOption = null;
let selectedBrand = null;
const brandsContainer = document.getElementById('brandsContainer'); // Define brandsContainer globally

function selectOption(optionNumber) {
    const option = document.querySelector(`.option:nth-child(${optionNumber})`);

    if (selectedOption) {
        // If an option is already selected, deselect it
        selectedOption.classList.remove('selected');
    }

    if (selectedOption !== option) {
        // If the clicked option is not the currently selected one, select it
        option.classList.add('selected');
        selectedOption = option;

        // Call a function to update brands based on the selected vehicle type
        updateBrands(optionNumber);
    } else {
        // If the clicked option is the currently selected one, deselect it
        selectedOption = null;
    }

    // Deselect the currently selected brand
    selectedBrand = null;
    updateBrandSelection();
}

function updateBrands(vehicleType) {
    // Clear previous brands
    brandsContainer.innerHTML = '';

    // You can customize the brands based on the selected vehicle type
    switch (vehicleType) {
        case 1:
            addBrand('Ather', 'ather2.png');
            addBrand('Bajaj', 'bajaj2.png');
            addBrand('Dao', 'dao2.jpg');
            addBrand('Ola', 'ola2.png'); 
            addBrand('Elthor', 'elthor2.jpg');
            addBrand('TVS', 'tvs2.png');
            break;
        case 2:
            addBrand('Altigreen', 'altigreen3.png');
            addBrand('ETO', 'ETO3.jpg');
            addBrand('Bajaj', 'bajaj2.png');
            addBrand('Mahindra', 'mahindra3.png');
            addBrand('Volta', 'volta3.png');
            addBrand('Hykon', 'hykon3.jpg');
            break;
            case 3:
                addBrand('Audi', 'audi4.jpg');
                addBrand('BMW', 'bmw4.jpg');
                addBrand('Kia', 'kia4.png');
                addBrand('Mahindra', 'mahindhra4.png');
                addBrand('Hyudai', 'hyundai4.png');
                addBrand('Tata', 'tata4.png');
                break;
            case 4:
                    addBrand('Olectra', 'olectra5.png');
                   
                    break;
        // Add cases for other vehicle types
    }
}



function addBrand(brandName, brandIcon) {
    const brandDiv = document.createElement('div');
    brandDiv.classList.add('brand');
    brandDiv.setAttribute('data-brand', brandName);
    brandDiv.onclick = function () {
        selectBrand(brandName);
    };

    const brandImage = document.createElement('img');
    brandImage.src = `vehicle/${brandIcon}`;
    brandImage.alt = brandName;

    const brandLabel = document.createElement('p');
    brandLabel.textContent = brandName;

    brandDiv.appendChild(brandImage);
   

    brandsContainer.appendChild(brandDiv);

    if (brandsContainer.children.length % 3 === 0) {
        brandsContainer.appendChild(document.createElement('br'));
    }
}

function selectBrand(brandName) {
    if (selectedBrand) {
        // If a brand is already selected, deselect it
        selectedBrand.classList.remove('selected');
    }

    const brandDiv = document.querySelector(`.brand[data-brand='${brandName}']`);
    if (selectedBrand !== brandDiv) {
        // If the clicked brand is not the currently selected one, select it
        brandDiv.classList.add('selected');
        selectedBrand = brandDiv;
    } else {
        // If the clicked brand is the currently selected one, deselect it
        selectedBrand = null;
    }

    // Call a function to handle the selected brand
    updateBrandSelection();
}

function updateBrandSelection() {
    // Do something with the selected brand
    console.log(selectedBrand ? `Selected Brand: ${selectedBrand.getAttribute('data-brand')}` : 'No Brand Selected');
}
// ... (Previous code)

 

function saveVehicle() {
   // Validate vehicle number format (KL 00 AA 0000)
   const vehicleNumber = document.getElementById('vehicleNumber');
   const vehicleNumberRegex = /^[A-Z]{2} \d{2} [A-Z]{2} \d{4}$/;

   if (!vehicleNumberRegex.test(vehicleNumber.value)) {
       alert('Please enter a valid vehicle number in the format KL 00 AA 0000.');
       return;
   }
    const selectedBrandName = selectedBrand ? selectedBrand.getAttribute('data-brand') : 'No Brand Selected';
    const selectedOptionName = selectedOption ? selectedOption.querySelector('p').textContent : 'None';

    // Get the currently authenticated user
    const user = auth.currentUser;

    if (user) {
        // User is signed in
        const userEmail = user.email;

        // Create a reference to the 'vehicles' node in the database
        const vehiclesRef = db.ref(`users/${user.uid}/vehicles`);

        // Generate a new key for the vehicle
        const vehicleKey = vehiclesRef.push().key;

        // Prepare the data to be saved
        const vehicleData = {
            type: selectedOptionName,
            brand: selectedBrandName,
            number: vehicleNumber.value,
            vehicleKey: vehicleKey, // Save the vehicleKey
            // Add user details
            user: {
                uid: user.uid,
                email: userEmail
            }
        };

        // Save the data to the database
        vehiclesRef.child(vehicleKey).set(vehicleData)
            .then(() => {
                console.log('Vehicle data saved successfully.');
                alert('Vehicle data saved successfully.');
                // Redirect to vehicle.html and pass the details as query parameters
                const queryString = `?type=${encodeURIComponent(selectedOptionName)}&brand=${encodeURIComponent(selectedBrandName)}&number=${encodeURIComponent(vehicleNumber)}`;
                window.location.href = `vehicle.html${queryString}`;
            })
            .catch((error) => {
                console.error('Error saving vehicle data:', error);
            });
    } else {
        // No user is signed in
        console.error('No user is signed in.');
    }
}
