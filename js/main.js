document.addEventListener("DOMContentLoaded", function () {

  // ========================================= //
  // 1. MOBILE MENU NAVIGATION                 //
  // ========================================= //
  const menuBtn = document.getElementById("menuBtn");
  const siteNav = document.getElementById("siteNav");

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

  // ========================================= //
  // 2. WHATSAPP BUTTONS LOGIC                 //
  // ========================================= //
  const whatsappBtn = document.getElementById("whatsappBtn");
  const floatingWhatsapp = document.getElementById("floatingWhatsapp");
  
  // Apna number yahan update zaroor karein
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

  // ========================================= //
  // 3. SCROLL REVEAL ANIMATION                //
  // ========================================= //
  const revealItems = document.querySelectorAll("[data-reveal]");
  if (revealItems.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            // Performance optimize karne ke liye ek baar dikhne ke baad observe karna band karein
            observer.unobserve(entry.target); 
          }
        });
      },
      { threshold: 0.14 }
    );
    revealItems.forEach((item) => observer.observe(item));
  }

  // ========================================= //
  // 4. PREMIUM CTA CONFETTI EFFECT            //
  // ========================================= //
  document.querySelectorAll('.nav-cta, .btn-primary, .btn-apple-primary').forEach(button => {
    button.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX || rect.left + rect.width / 2;
      const y = e.clientY || rect.top + rect.height / 2;
      const particlesCount = 25;
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

    const size = Math.random() * 6 + 4;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.background = color;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    const angle = Math.random() * Math.PI * 2;
    const velocity = 40 + Math.random() * 80;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;

    particle.style.setProperty('--tx', `${tx}px`);
    particle.style.setProperty('--ty', `${ty}px`);

    setTimeout(() => {
      particle.remove();
    }, 800);
  }

  // ========================================= //
  // 5. CURRENCY AUTO-DETECT LOGIC             //
  // ========================================= //
  try {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const isIndia = userTimeZone === 'Asia/Kolkata' || userTimeZone === 'Asia/Calcutta';
    
    const currencySymbols = document.querySelectorAll('.currency');
    const oldAmounts = document.querySelectorAll('.amt-old');
    const newAmounts = document.querySelectorAll('.amt-new');

    if (!isIndia && currencySymbols.length > 0) {
      currencySymbols.forEach(el => el.innerText = '$');
      oldAmounts.forEach(el => el.innerText = el.getAttribute('data-usd') || el.innerText);
      newAmounts.forEach(el => el.innerText = el.getAttribute('data-usd') || el.innerText);
    } else if (currencySymbols.length > 0) {
      currencySymbols.forEach(el => el.innerText = '₹');
      oldAmounts.forEach(el => el.innerText = el.getAttribute('data-inr') || el.innerText);
      newAmounts.forEach(el => el.innerText = el.getAttribute('data-inr') || el.innerText);
    }
  } catch (error) {
    console.log("Currency detection skipped.");
  }

  // ========================================= //
  // 6. BULLETPROOF FAQ ACCORDION SCRIPT       //
  // ========================================= //
  document.body.addEventListener('click', function(e) {
    // Check if the clicked element is our FAQ button
    const faqButton = e.target.closest('.faq-question');
    
    if (faqButton) {
      // 💡 FIX: Using closest() and querySelector() prevents HTML nesting bugs
      const faqItem = faqButton.closest('.faq-item'); 
      const faqAnswer = faqItem.querySelector('.faq-answer'); 
      
      // If elements are missing, fail silently instead of crashing
      if (!faqItem || !faqAnswer) return;

      // Close all OTHER open FAQs (Accordion style)
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
        // Expand
        faqAnswer.style.maxHeight = faqAnswer.scrollHeight + "px";
      } else {
        // Collapse
        faqAnswer.style.maxHeight = null;
      }
    }
  });

});
