document.getElementById('titan')
.addEventListener('click', function() {
    const payment = document.getElementById('show_payment').value;
    const changePayment = parseFloat(payment);
    console.log(changePayment);

    const contain = document.getElementById('bangladeshi_taka').innerText;
    const changeContain = parseFloat(contain);
    console.log(changeContain);

    const gen = document.getElementById('total').innerText;
    const changeGen = parseFloat(gen);
    console.log(changeGen);

    // Check for invalid payment
    if (isNaN(changePayment)) {
        document.getElementById("enter-3").classList.remove("hidden");
        return;
    }

    // Check if payment exceeds available amount
    if (changePayment > changeGen) {
        document.getElementById("reEnter-3").classList.remove("hidden");
        return;
    }

    // Update totals
    const totalAmount_3 = changePayment + changeContain;
    const newAmount_3 = changeGen - changePayment;

    document.getElementById("bangladeshi_taka").innerText = totalAmount_3.toFixed(2);
    document.getElementById("total").innerText = newAmount_3.toFixed(2);

    // Show success notification
    if (totalAmount_3 || newAmount_3) {
        document.getElementById('ox').classList.remove('hidden');
    }

    // Add history entry
    const historyDiv = document.getElementById('history-div');

    // Create a new notification
    const notification = document.createElement('div');
    notification.className = "notification";
    notification.innerText = `${changePayment.toFixed(2)} Taka is donated for Aid for Injured in the Quota Movement, Bangladesh`;
    historyDiv.appendChild(notification);

    // Create live time entry
    const liveTime = document.createElement('div');
    const now = new Date();
    liveTime.className = "live-time";
    liveTime.innerText = `Donation made at: ${now.toLocaleTimeString()} on ${now.toLocaleDateString()}`;
    historyDiv.appendChild(liveTime);

    // Ensure history section is visible
    document.getElementById('hisTory').classList.remove('hidden');
});
