// Smooth scroll for links and buttons
const smoothScroll = target => {
  const el = document.querySelector(target);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top: y, behavior: "smooth" });
};

document.querySelectorAll(".scroll-link").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const href = link.getAttribute("href");
    smoothScroll(href);
  });
});

document.querySelectorAll("[data-scroll]").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-scroll");
    smoothScroll(target);
  });
});

// Intersection Observer for fade-in sections
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));

// Pricing billing toggle
const billingToggle = document.getElementById("billingToggle");
const billingLabels = document.querySelectorAll(".billing-label");
const priceEls = document.querySelectorAll(".pricing-card .price");
let yearly = false;

billingLabels.forEach(label => {
  label.addEventListener("click", () => {
    const target = label.getAttribute("data-billing");
    const toYearly = target === "yearly";
    if (toYearly !== yearly) switchBilling(toYearly);
  });
});

billingToggle?.addEventListener("click", () => {
  switchBilling(!yearly);
});

function switchBilling(toYearly) {
  yearly = toYearly;
  billingLabels.forEach(label => {
    const mode = label.getAttribute("data-billing");
    label.classList.toggle("billing-label-active", mode === (yearly ? "yearly" : "monthly"));
  });
  const pill = billingToggle.querySelector(".toggle-pill");
  pill.classList.toggle("yearly", yearly);

  priceEls.forEach(el => {
    const monthly = el.getAttribute("data-monthly");
    const yearlyPrice = el.getAttribute("data-yearly");
    el.textContent = yearly ? yearlyPrice : monthly;
  });
}

// Mobile nav toggle
const nav = document.querySelector(".nav");
const navToggle = document.querySelector(".nav-toggle");

navToggle?.addEventListener("click", () => {
  nav.classList.toggle("open");
});

// Close nav on link click (mobile)
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});
