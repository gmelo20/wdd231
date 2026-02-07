import { places } from "../data/discover.mjs";

const grid = document.querySelector(".discover-grid");

places.forEach((place, index) => {
  const card = document.createElement("section");
  card.classList.add("discover-card", `card${index + 1}`);

  card.innerHTML = `
    <h2>${place.name}</h2>
    <figure class="discover-image">
      <img src="${place.image}" alt="${place.name}" loading="lazy">
    </figure>
    <address>${place.address}</address>
    <p>${place.description}</p>
  `;

  grid.appendChild(card);
});

// VISIT MESSAGE
const message = document.querySelector("#visit-message");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
  message.textContent = "Bem-vindo! Entre em contato caso tenha alguma dúvida.";
} else {
  const days = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));

  if (days < 1) {code .gitignore

    
    message.textContent = `Sua última visita foi há ${days} ${days === 1 ? "dia" : "dias"}.`;
  }
}

localStorage.setItem("lastVisit", now);
