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
// ========================================= //
// SCRATCH CARD & DYNAMIC OFFER LOGIC        //
// ========================================= //

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("scratchModal");
  const closeBtn = document.getElementById("closeScratch");
  const canvas = document.getElementById("scratchCanvas");
  const timerContainer = document.getElementById("offerTimerContainer");
  const timerText = document.getElementById("offerTimerText");
  const globalBanner = document.getElementById("globalOfferBanner");
  const globalTimerText = document.getElementById("globalTimerText");
  
  const OFFER_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds
  let isDrawing = false;
  let ctx = null;

  // 1. Check if offer is already active or used
  const offerEndTime = localStorage.getItem("webnex_offer_end");
  const modalShown = localStorage.getItem("webnex_modal_shown");

  if (offerEndTime && Date.now() < parseInt(offerEndTime)) {
    // Offer active! Update pricing and show banner
    applyDiscountToPricing();
    startTimer(parseInt(offerEndTime));
  } else if (!modalShown && modal) {
    // Show modal after 3 seconds on first visit
    setTimeout(() => {
      modal.classList.add("active");
      initScratchCard();
    }, 3000);
  }

  // Close Modal
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("active");
      localStorage.setItem("webnex_modal_shown", "true");
    });
  }

  // 2. Initialize Canvas Scratch
  function initScratchCard() {
    if (!canvas) return;
    ctx = canvas.getContext("2d");
    
    // Set actual size in memory (matches CSS)
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;

    // Draw Premium Gradient Cover
    let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#7C5CFF");
    gradient.addColorStop(1, "#30D5FF");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Text on top
    ctx.font = "bold 20px Inter";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText("SCRATCH HERE TO UNLOCK", canvas.width / 2, canvas.height / 2 + 7);

    // Scratch Logic
    ctx.globalCompositeOperation = "destination-out"; // This erases!
    
    // Events for Mouse & Touch
    canvas.addEventListener("mousedown", startScratch);
    canvas.addEventListener("touchstart", startScratch, {passive: false});
    canvas.addEventListener("mousemove", scratch);
    canvas.addEventListener("touchmove", scratch, {passive: false});
    document.addEventListener("mouseup", stopScratch);
    document.addEventListener("touchend", stopScratch);
  }

  function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  }

  function startScratch(e) {
    isDrawing = true;
    scratch(e);
  }

  function stopScratch() {
    isDrawing = false;
  }

  function scratch(e) {
    if (!isDrawing) return;
    e.preventDefault(); // Prevent scrolling on touch
    const pos = getMousePos(e);
    
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 25, 0, Math.PI * 2); // 25px brush size
    ctx.fill();

    checkScratchPercent();
  }

  // 3. Check if scratched enough (e.g., 40%)
  function checkScratchPercent() {
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparent = 0;
    
    // Check every 4th byte (Alpha channel)
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++;
    }
    
    const percent = (transparent / (pixels.length / 4)) * 100;
    
    if (percent > 40) {
      // Card completely revealed!
      canvas.style.opacity = "0";
      setTimeout(() => canvas.style.display = "none", 500);
      
      // Stop checking
      canvas.removeEventListener("mousemove", scratch);
      canvas.removeEventListener("touchmove", scratch);
      
      triggerOffer();
    }
  }

  // 4. Trigger the exact 10 min offer
  function triggerOffer() {
    const endTime = Date.now() + OFFER_DURATION;
    localStorage.setItem("webnex_offer_end", endTime);
    localStorage.setItem("webnex_modal_shown", "true");
    
    if(timerContainer) timerContainer.style.display = "block";
    applyDiscountToPricing();
    startTimer(endTime);
  }

  // 5. Global Timer System
  function startTimer(endTime) {
    if(globalBanner) globalBanner.classList.add("show");

    const timerInterval = setInterval(() => {
      const now = Date.now();
      const distance = endTime - now;

      if (distance <= 0) {
        clearInterval(timerInterval);
        localStorage.removeItem("webnex_offer_end");
        if(timerText) timerText.innerHTML = "EXPIRED";
        if(globalTimerText) globalTimerText.innerHTML = "EXPIRED";
        setTimeout(() => window.location.reload(), 2000); // Reload to reset prices
        return;
      }

      // Calculate minutes and seconds
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      const displayTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

      if(timerText) timerText.innerHTML = displayTime;
      if(globalTimerText) globalTimerText.innerHTML = displayTime;
    }, 1000);
  }

  // 6. Dynamically Update Pricing on Pages
  function applyDiscountToPricing() {
    // Look for the business plan card across any page
    const priceCards = document.querySelectorAll('.price-card');
    priceCards.forEach(card => {
      if(card.innerHTML.includes('Business')) {
        const priceElement = card.querySelector('.price');
        if(priceElement) {
          // Replace 1999 with 1499 dynamically!
          priceElement.innerHTML = `₹1499 <span style="text-decoration:line-through; font-size:1rem; opacity:0.6; margin-left:8px;">₹1999</span> <span> / $15</span>`;
        }
      }
    });
  }
});
