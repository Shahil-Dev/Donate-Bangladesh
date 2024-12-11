// Array to store donation history
let donationHistory_2 = [];

// Handle donation submission
document.getElementById('click_btn-2').addEventListener("click", function () {
    const bdt = document.getElementById('kdb-2').innerText;
    const changeBdt = parseFloat(bdt);
    const total = document.getElementById('total').innerText;
    const changeTotal = parseFloat(total);
    const payment = document.getElementById('payment-2').value;
    const changePayment = parseFloat(payment);

    // Check if payment is valid
    if (isNaN(changePayment)) {
        document.getElementById('enter-2').classList.remove('hidden');
        return;
    }

    if (changePayment > changeTotal) {
        document.getElementById('reEnter-2').classList.remove('hidden');
        return;
    }

    // Update amounts
    const totalAmount = changePayment + changeBdt;
    const newAmount = changeTotal - changePayment;

    document.getElementById('kdb-2').innerText = totalAmount;
    document.getElementById('total').innerText = newAmount;

    // Get the current time
    const now_2 = new Date();
    const formattedTime_2 = now_2.toLocaleString(); // Format the timestamp

    // Get the user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude; // Corrected
                const longitude = position.coords.longitude; // Corrected
                const location = `Lat: ${latitude.toFixed(2)}, Long: ${longitude.toFixed(2)}`;

                // Log donation to history
                const donationEntry_2 = `${changePayment} Taka is Donated for Flood Relief in Bangladesh. Time: ${formattedTime_2}, Address: ${location}`;
                donationHistory_2.push(donationEntry_2);

                // Show success modal
                document.getElementById('blog-2').classList.remove('hidden');
            },
            (error) => {
                console.error("Error retrieving location:", error);

                // Log donation without location
                const donationEntry_2 = `${changePayment} Taka is Donated for Flood Relief in Bangladesh. Time: ${formattedTime_2}, Address: Location unavailable`;
                donationHistory_2.push(donationEntry_2);

                // Show success modal
                document.getElementById('blog-2').classList.remove('hidden');
            }
        );
    } else {
        // Log donation if Geolocation is not supported
        const donationEntry_2 = `${changePayment} Taka is Donated for Flood Relief in Bangladesh. Time: ${formattedTime_2}, Address: Geolocation not supported`;
        donationHistory_2.push(donationEntry_2);

        // Show success modal
        document.getElementById('blog-2').classList.remove('hidden');
    }
});

// Handle "History" button click
document.getElementById('history').addEventListener("click", function () {
    // Hide the main content
    const mainContent = document.getElementById('hisTory'); // Ensure correct ID
    if (mainContent) {
        mainContent.classList.add('hidden'); // Hide the main content section
    }

    // Get the history-div element
    const historyDiv = document.getElementById('history-div');
    if (!historyDiv) {
        console.error("Error: Element with ID 'history-div' not found.");
        return;
    }

    // Clear previous entries
    historyDiv.innerHTML = "";

    // Display each history entry
    if (donationHistory_2.length === 0) {
        const noHistoryMessage = document.createElement('div');
        noHistoryMessage.textContent = "No donation history available.";
        noHistoryMessage.classList.add('text-lg', 'mt-2', 'text-gray-500');
        historyDiv.appendChild(noHistoryMessage);
    } else {
        donationHistory_2.forEach(entry => {
            const div = document.createElement('div');
            div.textContent = entry;
            div.classList.add('text-lg', 'mt-2');
            historyDiv.appendChild(div);
        });
    }
});
