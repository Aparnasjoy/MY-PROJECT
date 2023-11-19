firebase.initializeApp(firebaseConfig);

var db = firebase.database();

document.addEventListener("DOMContentLoaded", function () {
    const slotsPerDay = 6;
    const slotTable = document.getElementById("slotTable");

    const headerRow = slotTable.insertRow();
    headerRow.insertCell().textContent = "Terminal ID";

    for (let i = 1; i <= slotsPerDay; i++) {
        headerRow.insertCell().textContent = `Slot ${i}`;
    }

    const terminals = [
        { id: "Terminal1" },
        { id: "Terminal2" },
        // Add more terminals as needed
    ];

    terminals.forEach(terminal => {
        const row = slotTable.insertRow();
        const terminalCell = row.insertCell();
        terminalCell.textContent = terminal.id;

        for (let i = 1; i <= slotsPerDay; i++) {
            const slotCell = row.insertCell();
            slotCell.innerHTML = `<button onclick="bookSlot('${terminal.id}', ${i})">Book</button>`;
        }
    });
});

function bookSlot(terminalId, slotNumber) {
    console.log(`Booked Slot ${slotNumber} for Terminal ${terminalId}`);
}

function addSlots() {
    const terminalId = document.getElementById("terminalId").value;
    const slotsCount = parseInt(document.getElementById("slots").value, 10);

    if (!terminalId || isNaN(slotsCount) || slotsCount <= 0) {
        alert("Please enter valid values.");
        return;
    }

    console.log(`Added ${slotsCount} slots for Terminal ${terminalId}`);
}
