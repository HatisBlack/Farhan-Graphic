// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

// Scroll Reveal Animations
const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  revealElements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight - 100) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// Header shrink on scroll
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Hover effect fallback (JS-based color transition)
document.querySelectorAll(".service-card").forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.style.backgroundColor = "#FFD700";
    card.style.color = "#000";
  });
  card.addEventListener("mouseleave", () => {
    card.style.backgroundColor = "#222";
    card.style.color = "#fff";
  });
});
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async function(event) {
  event.preventDefault(); // prevent default form submit

  const data = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: "POST", // force POST
      body: data,
      headers: { "Accept": "application/json" }
    });

    if (response.ok) {
      status.textContent = "✅ Thank you! Your message has been sent.";
      status.style.color = "green";
      form.reset();
    } else {
      const result = await response.json();
      if (result.errors) {
        status.textContent = result.errors.map(e => e.message).join(", ");
      } else {
        status.textContent = "❌ Oops! Something went wrong. Try again.";
      }
      status.style.color = "red";
    }
  } catch (error) {
    status.textContent = "❌ Network error. Please check your connection.";
    status.style.color = "red";
    console.error(error);
  }
});