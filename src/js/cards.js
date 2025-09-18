async function loadCards() {
  try {
    const response = await fetch("./data/cards.json");
    const cards = await response.json();

    const container = document.getElementById("cards-container");
    container.innerHTML = "";

    cards.forEach(card => {
      // Create card element
      const cardElement = document.createElement("li");
      cardElement.classList.add("card");

      // Make card content accessible
      cardElement.innerHTML = `
        <a href="javascript:void(0)" rel="noopener noreferrer" class="card-link" title="${card.title}">
          <img src="${card.image}" alt="${card.description}" tabindex="0">
          <h3>${card.title}</h3>
          <p>${card.description}</p>
        </a>
      `;

      // Log clicks on card links
      const link = cardElement.querySelector(".card-link");
      link.addEventListener("click", e => {
        console.log(`Card link clicked: ${link.title}`);
      });

      // Allow keyboard Enter/Space to activate link
      link.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          link.click();
        }
      });

      container.appendChild(cardElement);
    });
  } catch (error) {
    console.error("Error loading cards:", error);
  }
}

// Load cards on page load
document.addEventListener("DOMContentLoaded", loadCards);