document.getElementById("temp").textContent = 75;
document.getElementById("condition").textContent = "Partly Cloudy";
document.getElementById("forecast").textContent = "Wed: 89°F | Thu: 68°F";

const spotlight = document.getElementById("spotlight-container");

spotlight.innerHTML = `
<div class="card">Coffee Uruguay<br>info@coffee.com</div>
<div class="card">Tech Montevideo<br>info@tech.com</div>
<div class="card">Tourism Hub<br>info@tourism.com</div>
`;
