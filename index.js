// Array to store donation history
let donationHistory = [];

document.getElementById("click_btn").addEventListener("click", function () {
  const bdt = document.getElementById("kdb").innerText;
  const changeBdt = parseFloat(bdt);
  const total = document.getElementById("total").innerText;
  const changeTotal = parseFloat(total);
  const payment = document.getElementById("payment").value;
  const changePayment = parseFloat(payment);

  // Check if payment is valid
  if (isNaN(changePayment)) {
    document.getElementById("enter").classList.remove("hidden");
    return;
  }

  if (changePayment > changeTotal) {
    document.getElementById("reEnter").classList.remove("hidden");
    return;
  }

  // Update amounts
  const totalAmount = changePayment + changeBdt;
  const newAmount = changeTotal - changePayment;

  document.getElementById("kdb").innerText = totalAmount;
  document.getElementById("total").innerText = newAmount;

  // Get the current time
  const now = new Date();
  const formattedTime = now.toLocaleString(); // Format the timestamp

  // Get the user's location (using Geolocation API)
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const location = `Lat: ${latitude.toFixed(
          2
        )}, Long: ${longitude.toFixed(2)}`;

        // Log donation to history
        const donationEntry = `${changePayment} Taka is Donated for Flood Relief in Feni,Bangladesh. Time: ${formattedTime}, Address: ${location}`;
        donationHistory.push(donationEntry);

        // Show success modal
        if (totalAmount && newAmount) {
          document.getElementById("blog").classList.remove("hidden");
        }
      },
      (error) => {
        console.error("Error retrieving location:", error);

        // Log donation without location
        const donationEntry = `${changePayment} Taka is Donated for Flood Relief in Feni,Bangladesh. Time: ${formattedTime}, Address: Location unavailable`;
        donationHistory.push(donationEntry);

        // Show success modal
        if (totalAmount && newAmount) {
          document.getElementById("blog").classList.remove("hidden");
        }
      }
    );
  } else {
    // Log donation if Geolocation is not supported
    const donationEntry = `${changePayment} Taka is Donated for Flood Relief in Feni,Bangladesh. Time: ${formattedTime}, Address: Geolocation not supported`;
    donationHistory.push(donationEntry);

    // Show success modal
    if (totalAmount && newAmount) {
      document.getElementById("blog").classList.remove("hidden");
    }
  }
});

// Handle "History" button click
document.getElementById("history").addEventListener("click", function () {
  // Hide main content
  document.getElementById("hisTory").classList.add("hidden");

  // Get the history-div element
  const historyDiv = document.getElementById("history-div");
  historyDiv.innerHTML = ""; // Clear previous entries

  // Display each history entry
  donationHistory.forEach((entry) => {
    const p = document.createElement("p");
    p.textContent = entry;
    p.classList.add("text-lg", "mt-2");
    historyDiv.appendChild(p);
  });
});
