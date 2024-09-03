document.addEventListener('DOMContentLoaded', function() {
    const pizzaCount = document.getElementById('pizza-count');
    const waterPercentage = document.getElementById('water-percentage');
    const saltPercentage = document.getElementById('salt-percentage');
    const yeastTypes = document.getElementsByName('yeast');
    const riseTime = document.getElementById('rise-time');
    const roomTemp = document.getElementById('room-temp');
    const result = document.getElementById('result');

    function updateValues() {
        // Update percentage displays
        document.getElementById('water-output').textContent = waterPercentage.value + '%';
        document.getElementById('salt-output').textContent = saltPercentage.value + '%';
        document.getElementById('rise-time-output').textContent = riseTime.value + 'h';
        document.getElementById('room-temp-output').textContent = roomTemp.value + '°C';

        // Calculate dough ingredients based on inputs
        const pizzaQty = parseInt(pizzaCount.value);
        const waterPct = parseInt(waterPercentage.value) / 100;
        const saltPct = parseInt(saltPercentage.value) / 100;

        // Base flour amount per pizza (in grams)
        const baseFlourPerPizza = 200;
        const flourAmount = baseFlourPerPizza * pizzaQty;

        // Water and salt amounts
        const waterAmount = flourAmount * waterPct;
        const saltAmount = flourAmount * saltPct;

        // Yeast amount calculation
        let yeastFactor = 1;
        if (yeastTypes[0].checked) {
            yeastFactor = 0.01; // Instant yeast
        } else if (yeastTypes[1].checked) {
            yeastFactor = 0.015; // Active dry yeast
        } else {
            yeastFactor = 0.03; // Fresh yeast
        }

        // Adjust yeast based on rise time and temperature
        const adjustedYeastFactor = yeastFactor * (10 / riseTime.value) * (20 / roomTemp.value);
        const yeastAmount = flourAmount * adjustedYeastFactor;

        result.innerHTML = `
            Flour: ${flourAmount.toFixed(2)}g<br>
            Water: ${waterAmount.toFixed(2)}g<br>
            Salt: ${saltAmount.toFixed(2)}g<br>
            Yeast: ${yeastAmount.toFixed(2)}g (${yeastTypes[0].checked ? 'Instant' : yeastTypes[1].checked ? 'Active Dry' : 'Fresh'})
        `;
    }

    // Event listeners for inputs
    pizzaCount.addEventListener('input', updateValues);
    waterPercentage.addEventListener('input', updateValues);
    saltPercentage.addEventListener('input', updateValues);
    riseTime.addEventListener('input', updateValues);
    roomTemp.addEventListener('input', updateValues);
    Array.from(yeastTypes).forEach(yeast => yeast.addEventListener('change', updateValues));

    // Initialize with default values
    updateValues();
});
