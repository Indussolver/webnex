const menuBtn = document.getElementById("menuBtn");
const siteNav = document.getElementById("siteNav");
const whatsappBtn = document.getElementById("whatsappBtn");
const floatingWhatsapp = document.getElementById("floatingWhatsapp");

const phoneNumber = "91XXXXXXXXXX";
const message = "Hi Webnex by Indus, I want a website for my business.";

function openWhatsApp() {
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

if (whatsappBtn) {
  whatsappBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openWhatsApp();
  });
}

if (floatingWhatsapp) {
  floatingWhatsapp.addEventListener("click", (e) => {
    e.preventDefault();
    openWhatsApp();
  });
}

if (menuBtn && siteNav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

const revealItems = document.querySelectorAll("[data-reveal]");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item) => observer.observe(item));
// ========================================= //
// PREMIUM CTA CELEBRATION (CONFETTI EFFECT) //
// ========================================= //

// Sabhi primary buttons par apply karenge
document.querySelectorAll('.nav-cta, .btn-primary').forEach(button => {
  button.addEventListener('click', function(e) {
    
    // Exact click coordinate nikalna (Jahan mouse click hua wahi se animation niklegi)
    const rect = this.getBoundingClientRect();
    const x = e.clientX || rect.left + rect.width / 2;
    const y = e.clientY || rect.top + rect.height / 2;

    // 25 chote-chote minimal particles create karenge
    const particlesCount = 25;
    
    // Website ki premium theme colors: Green, Purple, Cyan, Pink, White
    const colors = ['#24D366', '#7C5CFF', '#30D5FF', '#FF5C8D', '#ffffff'];

    for (let i = 0; i < particlesCount; i++) {
      createParticle(x, y, colors[Math.floor(Math.random() * colors.length)]);
    }
  });
});

function createParticle(x, y, color) {
  const particle = document.createElement('div');
  particle.classList.add('confetti-particle');
  document.body.appendChild(particle);

  // Random size from 4px to 10px (Minimal look)
  const size = Math.random() * 6 + 4; 
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.background = color;
  
  // Starting position exactly at cursor
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;

  // Randomize math physics (kahan girenge particles)
  const angle = Math.random() * Math.PI * 2;
  const velocity = 40 + Math.random() * 80; // Distance
  
  // X aur Y axis ki trajectory calculate karna
  const tx = Math.cos(angle) * velocity;
  const ty = Math.sin(angle) * velocity;

  // Custom CSS variables mein value pass karna
  particle.style.setProperty('--tx', `${tx}px`);
  particle.style.setProperty('--ty', `${ty}px`);

  // Memory bachaane ke liye animation ke baad particles ko DOM se hata dena
  setTimeout(() => {
    particle.remove();
  }, 800);
}
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Currency Auto-Detect Logic
    try {
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const isIndia = userTimeZone === 'Asia/Kolkata' || userTimeZone === 'Asia/Calcutta';
        
        const currencySymbols = document.querySelectorAll('.currency');
        const oldAmounts = document.querySelectorAll('.amt-old');
        const newAmounts = document.querySelectorAll('.amt-new');

        if (!isIndia) {
            // Change to USD
            currencySymbols.forEach(el => el.innerText = '$');
            oldAmounts.forEach(el => el.innerText = el.getAttribute('data-usd') || el.innerText);
            newAmounts.forEach(el => el.innerText = el.getAttribute('data-usd') || el.innerText);
        } else {
            // Keep INR
            currencySymbols.forEach(el => el.innerText = '₹');
            oldAmounts.forEach(el => el.innerText = el.getAttribute('data-inr') || el.innerText);
            newAmounts.forEach(el => el.innerText = el.getAttribute('data-inr') || el.innerText);
        }
    } catch (error) {
        console.log("Currency detection skipped.");
    }
});
