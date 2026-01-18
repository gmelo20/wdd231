// Display current year and last modified date
document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

// Set current date
const now = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
document.getElementById('current-date').textContent = now.toLocaleDateString('en-US', options);

// Weather API (using OpenWeatherMap)
const apiKey = 'YOUR_API_KEY'; // Get free key from openweathermap.org
const city = 'Montevideo';
const units = 'imperial'; // or 'metric'

async function getWeather() {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`
        );
        const data = await response.json();
        
        // Current weather
        document.getElementById('current-temp').textContent = `${Math.round(data.main.temp)}°F`;
        document.getElementById('weather-desc').textContent = data.weather[0].description;
        document.getElementById('humidity').textContent = data.main.humidity;
        document.getElementById('wind-speed').textContent = Math.round(data.wind.speed);
        
        // Weather icon
        const iconCode = data.weather[0].icon;
        document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${iconCode}.png`;
        document.getElementById('weather-icon').alt = data.weather[0].main;
        
    } catch (error) {
        console.error('Error fetching weather:', error);
        document.getElementById('weather-desc').textContent = 'Weather data unavailable';
    }
}

// Load random business spotlights
async function loadSpotlights() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();
        
        // Filter gold/silver members only
        const premiumMembers = members.filter(m => m.membershipLevel >= 2);
        
        // Shuffle and pick 2-3 members
        const shuffled = premiumMembers.sort(() => 0.5 - Math.random());
        const spotlights = shuffled.slice(0, 3);
        
        const container = document.getElementById('spotlights');
        container.innerHTML = '';
        
        spotlights.forEach(member => {
            const spotlight = document.createElement('div');
            spotlight.className = 'spotlight-card';
            spotlight.innerHTML = `
                <h3>${member.name}</h3>
                <p>${member.description || member.industry}</p>
                <p class="membership-badge">${member.membershipLevel === 2 ? 'Silver' : 'Gold'} Member</p>
                <p><a href="${member.website}" target="_blank">Visit Website</a></p>
            `;
            container.appendChild(spotlight);
        });
        
    } catch (error) {
        console.error('Error loading spotlights:', error);
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    getWeather();
    loadSpotlights();
});