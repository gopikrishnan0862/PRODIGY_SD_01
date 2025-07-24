function syncSlider() {
  document.getElementById("tempSlider").value = document.getElementById("tempInput").value;
}

function syncInput() {
  document.getElementById("tempInput").value = document.getElementById("tempSlider").value;
}

function convertTemperature() {
  const temp = parseFloat(document.getElementById("tempInput").value);
  const unit = document.getElementById("unit").value;
  const resultDiv = document.getElementById("result");

  resultDiv.innerHTML = "";

  if (isNaN(temp)) {
    resultDiv.innerHTML = `<div class="alert alert-danger">❌ Please enter a valid temperature.</div>`;
    return;
  }

  fetch('/convert', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ temperature: temp, unit: unit })
  })
  .then(res => res.json())
  .then(data => {
    resultDiv.innerHTML = `
      <div class="alert alert-primary">
        <p>🌡️ <strong>Celsius:</strong> ${data.celsius}°C</p>
        <p>🔥 <strong>Fahrenheit:</strong> ${data.fahrenheit}°F</p>
        <p>❄️ <strong>Kelvin:</strong> ${data.kelvin}K</p>
      </div>
    `;
  })
  .catch(() => {
    resultDiv.innerHTML = `<div class="alert alert-warning">⚠️ Error occurred. Please try again.</div>`;
  });
}
