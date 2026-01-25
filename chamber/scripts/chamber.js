// ==============================
// FOOTER INFO
// ==============================
document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

// ==============================
// HEADER DATE
// ==============================
const now = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
document.getElementById('current-date').textContent =
    `Montevideo, Uruguay | ${now.toLocaleDateString('en-US', options)}`;

// ==============================
// WEATHER API
// ==============================
const apiKey = '3a9017994e24654c78782726d19f0737';
const lat = -34.9011;
const lon = -56.1645;
const units = 'imperial';

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    document.getElementById('current-temp').textContent = `${Math.round(data.main.temp)}°F`;
    document.getElementById('weather-desc').textContent = data.weather[0].description;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('wind-speed').textContent = `${Math.round(data.wind.speed)} mph`;

    const icon = data.weather[0].icon;
    document.getElementById('weather-icon').src =
        `https://openweathermap.org/img/wn/${icon}@2x.png`;
    document.getElementById('weather-icon').alt = data.weather[0].description;
}

// ==============================
// FORECAST 3 DAYS
// ==============================
async function getForecast() {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = '';

    const filtered = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);

    filtered.forEach(day => {
        const date = new Date(day.dt * 1000).toLocaleDateString('en-US', {
            weekday: 'short'
        });

        const div = document.createElement('div');
        div.classList.add('forecast-day');
        div.innerHTML = `
            <p>${date}</p>
            <p>${Math.round(day.main.temp)}°F</p>
        `;
        forecastContainer.appendChild(div);
    });
}

// ==============================
// SPOTLIGHTS
// ==============================
async function loadSpotlights() {
    const response = await fetch('data/members.json');
    const members = await response.json();

    const premium = members.filter(m => m.membershipLevel >= 2);
    const selected = premium.sort(() => 0.5 - Math.random()).slice(0, 3);

    const container = document.getElementById('spotlights');
    container.innerHTML = '';

    selected.forEach(member => {
        const card = document.createElement('div');
        card.className = 'spotlight-card';
        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">${member.website}</a>
            <p class="membership-badge">
                ${member.membershipLevel === 3 ? 'Gold Member' : 'Silver Member'}
            </p>
        `;
        container.appendChild(card);
    });
}

// ==============================
// INIT
// ==============================
document.addEventListener('DOMContentLoaded', () => {
    getWeather();
    getForecast();
    loadSpotlights();
});
