document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImage");
  const captionText = document.getElementById("modalCaption");
  const closeBtn = document.querySelector(".close");
  const galleryImages = document.querySelectorAll(".gallery-img");

  let lastFocusedImg = null; // store the image that opened the modal

  // Make modal focusable
  modal.setAttribute("tabindex", "-1");

  // Open modal
  function openModal(img) {
    lastFocusedImg = img;
    modal.classList.add("is-open");
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    captionText.innerText = img.alt;
    modal.setAttribute("aria-hidden", "false");
    modal.focus();
  }

  // Close modal
  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    if (lastFocusedImg) lastFocusedImg.focus(); // return focus to image
  }

  // Close modal on click outside or close button
  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Open modal on image click or keyboard
  galleryImages.forEach((img) => {
    img.addEventListener("click", () => openModal(img));
    img.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(img);
      }
    });
  });

  // Close modal on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });

  // Trap focus inside modal
  modal.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      const focusable = modal.querySelectorAll("button, [tabindex]:not([tabindex='-1'])");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        // Tab
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  });
});
