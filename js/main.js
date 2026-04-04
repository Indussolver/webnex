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
/* ========================================= */
/* ADVANCED FAQ ACCORDION SCRIPT (ALL PAGES) */
/* ========================================= */

document.addEventListener("DOMContentLoaded", function() {
  
  // Event Delegation Method: This ensures it works even if FAQs are added later or on different pages.
  document.body.addEventListener('click', function(e) {
    
    // Check if the clicked element (or its parent) is a faq-question button
    const faqButton = e.target.closest('.faq-question');
    
    // If a faq-question was clicked
    if (faqButton) {
      const faqItem = faqButton.parentElement;
      const faqAnswer = faqButton.nextElementSibling;
      
      // OPTIONAL: Close all OTHER open FAQs first (Accordion effect)
      // If you want multiple FAQs to stay open at once, you can delete this block.
      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem && item.classList.contains('active')) {
          item.classList.remove('active');
          const otherAnswer = item.querySelector('.faq-answer');
          if (otherAnswer) {
            otherAnswer.style.maxHeight = null;
          }
        }
      });

      // Toggle the clicked FAQ
      faqItem.classList.toggle('active');
      
      if (faqItem.classList.contains('active')) {
        // Expand the answer
        faqAnswer.style.maxHeight = faqAnswer.scrollHeight + "px";
      } else {
        // Collapse the answer
        faqAnswer.style.maxHeight = null;
      }
    }
  });

});
// ========================================= //
  // 7. MOBILE DROPDOWN MENU FIX               //
  // ========================================= //
  const mobileDropdowns = document.querySelectorAll('.dropdown');

  mobileDropdowns.forEach(dropdown => {
    const mainLink = dropdown.querySelector('.nav-link');
    
    mainLink.addEventListener('click', function(e) {
      // Check if user is on mobile (screen width 820px or less)
      if (window.innerWidth <= 820) {
        // Stop the link from opening the page directly
        e.preventDefault(); 
        
        // Optional: Close other dropdowns if one is clicked
        mobileDropdowns.forEach(otherDropdown => {
          if (otherDropdown !== dropdown) {
            otherDropdown.classList.remove('active');
          }
        });

        // Toggle the current dropdown menu
        dropdown.classList.toggle('active');
      }
    });
  });
